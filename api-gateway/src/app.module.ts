import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/book.module';
import { BooksController } from './books/book.controller';
import { MagazinesModule } from './magazines/magazines.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards/access-token.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env.development.local'],
    }),
    BooksModule,
    MagazinesModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.RATELIMIT_TIME_TO_LIVE || '60', 10), // 기본값을 60초로 설정
        limit: parseInt(process.env.RATE_LIMIT_MAX_NUMBER_REQUEST || '10', 10), // 기본값을 10으로 설정
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [
    { provide: APP_GUARD, useClass: AtGuard },
    // 글로벌 스코프로 ThrottlerGuard 설정
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
