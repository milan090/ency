import { FirebaseAuthenticationService } from "@aginix/nestjs-firebase-admin";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private firebaseAuth: FirebaseAuthenticationService) {}

  async validateUser(token: string): Promise<boolean> {
    try {
      const idToken = await this.firebaseAuth.verifyIdToken(token);
      return !!idToken.uid;
    } catch (error) {
      return false;
    }
  }
}
