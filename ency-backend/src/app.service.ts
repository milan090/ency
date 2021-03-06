import { FirebaseAuthenticationService } from "@aginix/nestjs-firebase-admin";
import { Get, Injectable, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth/auth.guard";

@Injectable()
export class AppService {}
