import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "./auth/auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("user")
  @UseGuards(AuthGuard)
  getUser(): string {
    return "You are signed in";
  }
}
