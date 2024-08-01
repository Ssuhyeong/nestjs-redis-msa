import { Module } from '@nestjs/common';
import { BooksController } from './book.controller';

@Module({
  providers: [BooksController],
})
export class BooksModule {}
