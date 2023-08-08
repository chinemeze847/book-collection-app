import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { BookDto, UpdateBookDto } from '../src/book/dto';

describe('App (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

    beforeAll(async () => {
      const moduleRef =
        await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
  
      app = moduleRef.createNestApplication();
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
        }),
      );
      await app.init();
      await app.listen(3000);
  
      prisma = app.get(PrismaService);
      await prisma.cleanDb();
      pactum.request.setBaseUrl(
        'http://localhost:3000',
      );
    });

  afterAll(() => {
    app.close();
  });

  describe('Create bookmark', () => {
    const dto: BookDto = {
      title: "Foxes book of matyre",
      author: "John Foxe",
      isbn: "0-9767736-60898",
      category: "History",
      description: "eating that frog",
      price: 14500
    };

    it('should create book', () => {
      return pactum
        .spec()
        .post('/books')
        .withBody(dto)
        .expectStatus(201)
        .stores('bookId', 'id');
    });
  });

  describe('Get books', () => {
    it('should get books', () => {
      return pactum
        .spec()
        .get('/books')
        .expectStatus(200)
        .expectJsonLength(1);
    });
  });

  describe('update book', () => {
    it('should update book', () => {
      const dto : UpdateBookDto = {
        author: "pillar henry",
      };
      return pactum
        .spec()
        .patch('/books/1')
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.author)
    });
  });


describe('Delete book by id', () => {
  it('should delete book', () => {
    return pactum
      .spec()
      .delete('/books/{id}')
      .withPathParams('id', '$S{bookId}')
      .expectStatus(204);
  });
});

});