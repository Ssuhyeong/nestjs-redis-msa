import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

// Create micro service options
const microserviceOptions = {
  name: 'BOOK_SERVICE',
  transport: Transport.REDIS,
  options: {
    host: 'redis',
    port: 6379,
  },
};
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen();
}
bootstrap();
