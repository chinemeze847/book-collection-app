import { BookDto, UpdateBookDto } from './dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private bookService : BookService){}

  /**
   * This method gets all books
   * @returns all books
   */
  @Get()
  getBooks() {
    return this.bookService.getAllBooks();
  }

  /**
   * Gets book by id
   * @param bookId the id of the book to be gotten
   * @returns the specific book
   */
  @Get(':id')
  async getBookById(
    @Param('id', ParseIntPipe) bookId: number,
  ) {
    return await this.bookService.getBookById(
      bookId,
    );
  }

  /**
   * creates book
   * @param dto 
   * @returns created book
   */
  @Post()
  createBook(
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

  /**
   * updates the book
   * @param bookId 
   * @param dto 
   * @returns updated book
   */
  @Patch(':id')
  updateBookById(
    @Param('id', ParseIntPipe) bookId: number,
    @Body() dto: UpdateBookDto,
  ) {
    return this.bookService.updateBookById(
      bookId,
      dto,
    );
  }

  /**
   * Deletes a book
   * @param bookId the id of the book
   * @returns 
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookById(
    @Param('id', ParseIntPipe) bookId: number,
  ) {
    return this.bookService.deleteBookById(
      bookId,
    );
  }
}


