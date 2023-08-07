import { BookDto } from './dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  //Gets all the books from db
  getAllBooks() {
    return this.prisma.book.findMany();
  }

  //gets book by Id
  getBookById(bookId: number) {
    return this.prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });
  }

  //create a book
  async createBook(dto: BookDto) {
    try {
      const book = await this.prisma.book.create({
        data: dto,
      });
      // Check if the object was created
      if (book) {
        return book;
      } else {
        // Handle the case when the object was not created
        throw new Error('Book creation failed.');
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'The ISBN number must be unique',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  
}
