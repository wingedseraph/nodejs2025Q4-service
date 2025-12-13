export const USER_ERRORS = {
  NOT_FOUND_ERROR: 'User not found' as const,
  OLD_PASSWORD_WRONG_ERROR: 'Old password is wrong' as const,
  LOGIN_ALREADY_EXISTS_ERROR: 'Login already exists' as const,
  PASSWORD_WRONG_ERROR: 'Password is wrong' as const,
};

export const FAVORITES_MESSAGES = {
  SUCCESSFUL_ADDED: 'Entity added to favorites' as const,
  SUCCESSFUL_DELETED: 'Entity deleted from favorites' as const,
};

export const GENERIC_ERRORS = {
  NOT_FOUND_ERROR: 'Entity not found' as const,
};

export const AUTH_ERRORS = {
  TOKEN_MISSING: 'Access token is missing' as const,
  TOKEN_INVALID: 'Access token is invalid or expired' as const,
  REFRESH_TOKEN_MISSING: 'Refresh token is missing' as const,
  REFRESH_TOKEN_INVALID: 'Refresh token is invalid or expired' as const,
};
