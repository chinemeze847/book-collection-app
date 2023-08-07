import { BookDto, UpdateBookDto } from './dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private bookService : BookService){}

  @Get()
  getBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  async getBookById(
    @Param('id', ParseIntPipe) bookId: number,
  ) {
    return await this.bookService.getBookById(
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

  @Patch(':id')
  updateBookmarkById(
    @Param('id', ParseIntPipe) bookId: number,
    @Body() dto: UpdateBookDto,
  ) {
    return this.bookService.updateBookById(
      bookId,
      dto,
    );
  }

}
