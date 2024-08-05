import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

// Create micro service options
const microserviceOptions = {
  name: 'AUTH_SERVICE',
  transport: Transport.REDIS,
  options: {
    host: 'redis',
    port: 6379,
  },
};
async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  // To use `enableShutdownHooks` in `prisma.service`
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.listen();
}
bootstrap();
