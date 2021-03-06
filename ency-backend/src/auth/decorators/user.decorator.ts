import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IUser } from "../interfaces/user.interface";

export const User = createParamDecorator<IUser>(
  (data: unknown, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
