import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import Request from 'supertest';
import { AuthModule } from './auth.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
// TODO
//   it('/ (GET)', () => {
//     return Request(app.getHttpServer())
//       .get('/')
//       .expect(404)
//   });
});
