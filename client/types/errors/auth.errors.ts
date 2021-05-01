export type AuthErrorCode = "EMAIL_PASSWORD_DOESNT_EXIST" | "USER_ALREADY_EXISTS";

export class AuthError extends Error {
  public message: AuthErrorCode;

  constructor(error: AuthErrorCode) {
    super();
    this.message = error;
  }
}
