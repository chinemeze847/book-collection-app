import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [BookModule, PrismaModule],
})
export class AppModule {}
