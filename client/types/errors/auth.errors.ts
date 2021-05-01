export type AuthErrorCode = "email/pass";

export class AuthError extends Error {
  public message: AuthErrorCode;

  constructor(error: AuthErrorCode) {
    super();
    this.message = error;
  }
}
