import {
  Controller,
  Logger,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CreateBookDTO } from './book.dto';

@Controller('books')
export class BooksController {
  client: ClientProxy;
  logger = new Logger('Books');
  constructor(private configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      },
    });
  }

  @Get()
  async getBooks() {
    this.logger.log('Getting all books');
    const pattern = { cmd: 'getBooks' };
    return await this.client.send(pattern, {});
  }

  @Get(':bookID')
  async getBook(@Param('bookID') bookID) {
    this.logger.log(bookID);
    const pattern = { cmd: 'getBookById' };
    return await this.client.send(pattern, bookID);
  }

  @Post()
  async addBook(@Body() CreateBookDTO: CreateBookDTO) {
    this.logger.log(CreateBookDTO);
    const book = await this.client.send({ cmd: 'addBook' }, CreateBookDTO);
    return book;
  }

  @Delete()
  async deleteBook(@Query() query) {
    const books = await this.client.send({ cmd: 'deleteBook' }, query);
    return books;
  }
}
