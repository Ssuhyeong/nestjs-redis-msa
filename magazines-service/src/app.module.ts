import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MagazinesModule } from './magazines/magazines.module';

@Module({
  imports: [MagazinesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
