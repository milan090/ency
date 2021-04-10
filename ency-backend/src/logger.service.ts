import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class LoggerService extends Logger {
  error(message: string, trace: string) {
    super.error(message, trace);
  }
}
