import { FirebaseAuthenticationService } from "@aginix/nestjs-firebase-admin";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private firebaseAuth: FirebaseAuthenticationService) {}

  getHello(): string {
    return "Hello World!";
  }
}
