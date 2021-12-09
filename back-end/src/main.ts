import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as express from 'express'
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.enableCors({
        origin: process.env.ORIGIN_ENABLE_CORS,
        credentials: true
    });
    const config = new DocumentBuilder()
        .setTitle('Social Card')
        .setDescription('The description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);

    app.useGlobalPipes(new ValidationPipe());


    await app.listen(process.env.PORT); 
}

bootstrap();
