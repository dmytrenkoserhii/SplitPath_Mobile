export const PUBLIC_ROUTES = [
  '/(auth)/sign-in',
  '/(auth)/sign-up',
  '/(auth)/forgot-password',
  '/(auth)/reset-password',
  '/(auth)/email-confirmation',
  '/(auth)/email-verification',
];

export const API_ENDPOINTS = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  VERIFY_TOKEN: '/users/current',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/users/verify-email',
  RESEND_VERIFICATION: '/users/resend-verification',
} as const;
