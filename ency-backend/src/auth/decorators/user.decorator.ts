import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IFirebaseUser } from "../interfaces/user.interface";

export const FirebaseUser = createParamDecorator<IFirebaseUser>(
  (data: unknown, ctx: ExecutionContext): IFirebaseUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
