import { Module } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
