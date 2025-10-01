import { API_ENDPOINTS } from '@/src/constants';
import { xiorClient } from '@/src/lib';
import { SignInFormSchemaType, SignUpDataType } from '@/src/schemas/auth';
import { AuthResponse } from '@/src/types/auth';
import { User } from '@/src/types/user';

export class AuthService {
  async signUp(data: SignUpDataType): Promise<AuthResponse> {
    const response = await xiorClient.post<AuthResponse>(
      API_ENDPOINTS.SIGN_UP,
      {
        email: data.email,
        password: data.password,
        username: data.username,
      }
    );
    return response.data;
  }

  async signIn(data: SignInFormSchemaType): Promise<AuthResponse> {
    const response = await xiorClient.post<AuthResponse>(
      API_ENDPOINTS.SIGN_IN,
      {
        email: data.email,
        password: data.password,
      }
    );
    return response.data;
  }

  async signOut(): Promise<void> {
    await xiorClient.get(API_ENDPOINTS.LOGOUT);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await xiorClient.post<AuthResponse>(
      API_ENDPOINTS.REFRESH,
      {
        refreshToken,
      }
    );
    return response.data;
  }

  async verifyToken(): Promise<User> {
    const response = await xiorClient.get<User>(API_ENDPOINTS.VERIFY_TOKEN);
    return response.data;
  }

  async forgotPassword(email: string): Promise<void> {
    await xiorClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
  }

  async resetPassword(token: string, password: string): Promise<void> {
    await xiorClient.post(API_ENDPOINTS.RESET_PASSWORD, {
      token,
      password,
    });
  }

  async verifyEmail(token: string): Promise<void> {
    await xiorClient.post(API_ENDPOINTS.VERIFY_EMAIL, { token });
  }

  async resendVerificationEmail(): Promise<void> {
    await xiorClient.post(API_ENDPOINTS.RESEND_VERIFICATION);
  }
}

export const authService = new AuthService();
