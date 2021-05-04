export type AuthErrorCode = "EMAIL_PASSWORD_DOESNT_EXIST" | "USER_ALREADY_EXISTS" | "INVALID_NAME";

export class AuthError extends Error {
  public message: AuthErrorCode;

  constructor(error: AuthErrorCode) {
    super();
    this.message = error;
  }
}
