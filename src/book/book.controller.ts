import { Controller, Get } from '@nestjs/common';
import { BookDto } from './dto';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private bookService : BookService){}

  @Get()
  getBooks() {
    return this.bookService.getAllBooks();
  }

}
