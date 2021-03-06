import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { User } from "./decorators/user.decorator";
import { SignUpDto } from "./dto/sign-up.dto";
import { IUser, UserEntity } from "./interfaces/user.interface";

@Controller("auth")
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-up")
  async signUp(@User() user, @Body() body: SignUpDto): Promise<UserEntity> {
    const { email, name } = body;

    // const user = await this.authService.getUser(uid);
    try {
      await this.authService.createUser(user.uid, name, email);
    } catch (error) {
      if (error.code === "P2002") {
        return this.authService.getUser(user.uid);
      }
      console.log(error);
      throw new InternalServerErrorException("Something went wrong");
    }
    return user;
  }

  @Get()
  async getUser(@User() user: IUser): Promise<UserEntity> {
    return this.authService.getUser(user.uid);
  }
}
