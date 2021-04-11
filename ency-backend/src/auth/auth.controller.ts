import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaInterceptor } from "../prisma/prisma.interceptor";
import { Public } from "./auth.guard";
import { AuthService } from "./auth.service";
import { FirebaseUser } from "./decorators/user.decorator";
import { SignUpEmailPassDto } from "./dto/sign-up.dto";
import { IFirebaseUser } from "./interfaces/user.interface";

@Controller("auth")
@UseInterceptors(PrismaInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("email")
  @Public()
  async signUp(@Body() body: SignUpEmailPassDto): Promise<User> {
    const { email, name, password } = body;

    const newUser = await this.authService.signUpEmailPass(email, password);
    const res = await this.authService.createUser(newUser.uid, name, email);
    return res;
  }

  @Get()
  async getUser(@FirebaseUser() user: IFirebaseUser): Promise<User> {
    let userData = await this.authService.getUser(user.uid);
    if (!userData) {
      // If user exists in firebase but not in DB
      // Create a new user in DB (all stats are reset)
      const { email, displayName } = await this.authService.getFirebaseUser(
        user.uid,
      );
      if (!email) {
        throw new Error("User doesnt have an email");
      }

      userData = await this.authService.createUser(
        user.uid,
        displayName || email,
        email,
      );
    }
    return userData;
  }
}
