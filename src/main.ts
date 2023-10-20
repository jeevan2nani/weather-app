import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe);
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    })
  );

  // Configure cookie parsing middleware
  app.use(cookieParser());
  app.enableCors({
    origin:'http://localhost:3001',
    credentials:true,
  });
  await app.listen(3000);
}
bootstrap();
