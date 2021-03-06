import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "./auth/auth.guard";
import { User } from "./auth/decorators/user.decorator";
import { IUser } from "./auth/interfaces/user.interface";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Get("user")
  getUser(@User() user): IUser {
    return user;
  }
}
