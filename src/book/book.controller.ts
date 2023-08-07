import { BookDto } from './dto/book.dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post,HttpException,HttpStatus } from '@nestjs/common';
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

  @Post()
  createBookmark(
    @Body() dto: BookDto,
  ) {
    try {
        return this.bookService.createBook(
            dto
          );
      } catch (error) { 
        return error;
      } 
  }



}
