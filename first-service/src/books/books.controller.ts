import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern({ cmd: 'getBooks' })
  async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @MessagePattern({ cmd: 'getBookById' })
  async getBook(bookID) {
    const book = await this.booksService.getBook(bookID);
    return book;
  }

  @MessagePattern({ cmd: 'addBook' })
  async addBook(CreateBookDTO: CreateBookDto) {
    const book = await this.booksService.addBook(CreateBookDTO);
    return book;
  }

  @MessagePattern({ cmd: 'deleteBook' })
  async deleteBook(query) {
    const books = await this.booksService.deleteBook(query.bookID);
    return books;
  }
}
