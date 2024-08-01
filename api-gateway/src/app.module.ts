import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './books/book.module';
import { BooksController } from './books/book.controller';
import { MagazinesModule } from './magazines/magazines.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env.development.local'],
    }),
    ClientsModule.registerAsync([
      {
        name: 'THIRD_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        }),
      },
    ]),
    BooksModule,
    MagazinesModule,
  ],
  controllers: [AppController, BooksController],
  providers: [],
})
export class AppModule {}
