import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";

async function bootstrap() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  const config = new DocumentBuilder()
    .setTitle("PhotoVoyage API")
    .setVersion("1.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/docs", app, document);

  app.enableCors();

  app.use("/", express.static("client/dist"));

  await app.listen(PORT, () =>
    console.log(`Port has started on1 ${PORT} port`),
  );
}
bootstrap();
