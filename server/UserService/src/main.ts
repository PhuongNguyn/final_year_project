import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', true);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({ origin: '* ' });
  const config = new DocumentBuilder()
    .setTitle('final_project User Service')
    .setDescription('The final_project API description')
    .setVersion('1.0')
    .addTag('final_project')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'user-services:8101',
      package: 'user',
      protoPath: join(__dirname, 'proto/user.proto'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(8001);
}
bootstrap();
