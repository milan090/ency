import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaInterceptor } from "src/prisma/prisma.interceptor";
import { AuthService } from "./auth.service";
import { FirebaseUser } from "./decorators/user.decorator";
import { SignUpDto } from "./dto/sign-up.dto";
import { IFirebaseUser } from "./interfaces/user.interface";

@Controller("auth")
@UseInterceptors(PrismaInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-up")
  async signUp(
    @FirebaseUser() user: IFirebaseUser,
    @Body() body: SignUpDto,
  ): Promise<User> {
    const { email, name } = body;

    return await this.authService.createUser(user.uid, name, email);
  }

  @Get()
  async getUser(@FirebaseUser() user: IFirebaseUser): Promise<User> {
    const userData = await this.authService.getUser(user.uid);

    if (!userData) throw new NotFoundException("User with given id not found");
    return userData;
  }
}
