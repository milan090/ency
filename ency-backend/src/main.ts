import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { LoggerService } from "./logger.service";
import morgan from "morgan";

const PORT = process.env.API_PORT || 8080;
const ORIGIN_URL = process.env.ORIGIN_URL || "http://localhost:3000";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle("Ency API")
    .setDescription("API for Ency Frontend for CRUD")
    .setVersion("1.0")
    .addTag("ency")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ORIGIN_URL,
    credentials: true,
  });
  const logger = new LoggerService("Request");
  app.use(
    morgan("tiny", {
      stream: {
        write: (message) => logger.log(message.replace("\n", "")),
      },
    }),
  );
  await app.listen(PORT, "0.0.0.0");
  LoggerService.verbose(`listening on port ${PORT}`);
}
bootstrap();
