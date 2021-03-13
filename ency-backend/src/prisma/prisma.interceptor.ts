import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

/**
 * Handles errors of type PrismaClientKnownRequestError
 */
@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new BadRequestException("Already exists");
          }
        }
        return throwError(error);
      }),
    );
  }
}
