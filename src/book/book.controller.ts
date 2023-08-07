import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private bookService : BookService){}

  @Get()
  getBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  getBookById(
    @Param('id', ParseIntPipe) bookId: number,
  ) {
    return this.bookService.getBookById(
      bookId,
    );
  }

  

}
