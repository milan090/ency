import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ModuleTokenFactory } from "@nestjs/core/injector/module-token-factory";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split("Bearer ")[1];
    return this.authService.validateUser(token);
  }
}
