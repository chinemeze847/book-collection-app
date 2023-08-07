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
        throw new HttpException('Book creation failed.', HttpStatus.NOT_FOUND);
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

  async updateBookById(bookId: number, dto: BookDto) {
    // get the book by id
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (book) {
      try {
        return this.prisma.book.update({
          where: {
            id: bookId,
          },
          data: {
            ...dto,
          },
        });
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
    } else {
      throw new HttpException('Book Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
