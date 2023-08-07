import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
    constructor(private prisma : PrismaService){}

    //Gets all the books from db
    getAllBooks(){
        return this.prisma.book.findMany()
    }

    //gets book by Id
    getBookById(
        bookId: number,
      ) {
        return this.prisma.book.findFirst({
          where: {
            id: bookId
          },
        });
      }
}
