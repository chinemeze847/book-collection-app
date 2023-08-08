import { BookDto, UpdateBookDto } from './dto';
import { Injectable, HttpException, HttpStatus,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gets all the books from db
   * @returns all records
   */
  getAllBooks() {
    return this.prisma.book.findMany();
  }

  /**
   * Gets the book by id
   * @param bookId id of the book to be retrieved
   * @returns specific book
   */
  getBookById(bookId: number) {
    return this.prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });
  }

  /**
   * creates a book
   * @param dto object to be passed for creation
   * @returns created book
   */
  async createBook(dto: BookDto) {
    try {
      // Check if the book with the same ISBN already exists in the database
    const existingBook = await this.prisma.book.findFirst({
        where: {
          isbn: dto.isbn,
        },
      });
  
      if (existingBook) {
        // Book with the same ISBN already exists, so throw an exception
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Book with the same ISBN already exists.',
          },
          HttpStatus.CONFLICT,
        );
      }
  
      // If the control reaches here, it means the book doesn't exist in the database, so create it
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

  /**
   * This updates the bood by id
   */
  async updateBookById(bookId: number, dto: UpdateBookDto) {
    try {
        // Get the book by id
        const book = await this.prisma.book.findUnique({
          where: {
            id: bookId,
          },
        });
    
        if (!book) {
          throw new HttpException('Book Not Found', HttpStatus.NOT_FOUND);
        }
    
        try {
          return await this.prisma.book.update({
            where: {
              id: bookId,
            },
            data: {
              ...dto,
            },
          });
        } catch (error: any) {
          // Handle Prisma specific errors
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'The ISBN number must be unique',
                },
                HttpStatus.BAD_REQUEST,
              );
            }
            // Handle other Prisma errors here if needed
          }
    
          // For other unexpected errors, provide a generic message or log the error
          throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } catch (error) {
        // Handle any other unexpected errors here
        throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
 }

/**
 * This method deletes a book with a specified id
 * @param bookId the id of the book to be deleted
 */
async deleteBookById(
    bookId: number,
  ) {

    //finds the book with specific id
    const book =
      await this.prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });

    //returns this if not found
    if (!book)
      throw new NotFoundException();

    //delete book 
    await this.prisma.book.delete({
      where: {
        id: bookId,
      },
    });
  }
}

