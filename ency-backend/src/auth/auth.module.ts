import { Module } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [PrismaModule],
  providers: [AuthService, AuthGuard, PrismaService],
  exports: [AuthGuard, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
