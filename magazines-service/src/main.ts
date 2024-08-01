import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    name: 'MAGAZINE_SERVICE',
    transport: Transport.REDIS,
    options: {
      host: 'redis',
      port: 6379,
    },
  });
  await app.listen();
  console.log('Second microservice is listening');
}
bootstrap();
