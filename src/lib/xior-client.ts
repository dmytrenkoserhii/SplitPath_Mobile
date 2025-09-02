import xior, {
  XiorError,
  XiorInterceptorRequestConfig,
  XiorRequestConfig,
} from "xior";
import { storage } from "./storage";

const BACKEND_URL =
  process.env.EXPO_PUBLIC_BACKEND_URL || "http://192.168.0.100:5050";

if (!BACKEND_URL) {
  throw new Error("Missing environment variable: EXPO_PUBLIC_BACKEND_URL");
}

export const xiorClient = xior.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: XiorRequestConfig;
}[] = [];

const processQueue = (error: XiorError | null) => {
  failedQueue.forEach((prom) => {
    if (!error) {
      // Retry the original request with new token
      prom.resolve(xiorClient.request(prom.config));
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

const requestInterceptor = async (config: XiorInterceptorRequestConfig) => {
  try {
    const accessToken = await storage.getAccessToken();

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  } catch (error) {
    console.error("Error adding auth token to request:", error);
  }

  return config;
};

const responseErrorInterceptor = async (error: XiorError) => {
  const originalRequest = error.config;

  if (
    error.response?.status === 401 &&
    !originalRequest?.url?.includes("/auth/sign-in") &&
    !originalRequest?.url?.includes("/auth/refresh")
  ) {
    const hasTokens = await storage.hasAuthTokens();

    if (!hasTokens) {
      console.log("🍪 Cookie-based auth detected, skipping token refresh");
      return Promise.reject(error);
    }

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshToken = await storage.getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshResponse = await xiorClient.post("/auth/refresh", {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        await Promise.all([
          storage.setAccessToken(newAccessToken),
          storage.setRefreshToken(newRefreshToken),
        ]);

        isRefreshing = false;
        processQueue(null);

        if (originalRequest) {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
          return xiorClient.request(originalRequest);
        }
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError as XiorError);

        await storage.clearAuthData();

        console.error("Token refresh failed, user needs to login again");

        return Promise.reject(refreshError);
      }
    }

    return new Promise((resolve, reject) => {
      if (originalRequest) {
        failedQueue.push({ resolve, reject, config: originalRequest });
      } else {
        reject(error);
      }
    });
  }

  return Promise.reject(error);
};

xiorClient.interceptors.request.use(requestInterceptor);
xiorClient.interceptors.response.use(
  (response) => response,
  responseErrorInterceptor
);

export const isUnauthorizedError = (error: unknown): boolean => {
  if (error instanceof XiorError && error.response?.status === 401) {
    return true;
  }
  return false;
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    return await storage.hasAuthTokens();
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
};
