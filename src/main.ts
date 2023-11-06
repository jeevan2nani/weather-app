import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  console.log(`SESSION_SECRET: ${process.env.SESSION_SECRET}`);
  console.log(JSON.stringify(process.env, null, 2));

  // Configure cookie parsing middleware
  app.use(cookieParser());
  app.enableCors({
    origin:'http://localhost:3001',
    credentials:true,
  });

  const config = new DocumentBuilder()
    .setTitle('Weather Data APIs')
    .setDescription('Contains all the APIs using for the weather app')
    .setVersion('1.0')
    .addTag('weather')
    .build();
  
  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('api',app,document);

  await app.listen(3000);
}
bootstrap();
