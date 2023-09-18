import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({ origin: '* ' });
  const config = new DocumentBuilder()
    .setTitle('Cuabien.vn User Service')
    .setDescription('The Cuabien.vn API description')
    .setVersion('1.0')
    .addTag('Cuabien.vn')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:8102',
      package: 'product',
      protoPath: join(__dirname, 'proto/product.proto'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(8002);
}
bootstrap();
