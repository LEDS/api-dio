import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';

describe('News Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [NewsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: NewsController = module.get<NewsController>(NewsController);
    expect(controller).toBeDefined();
  });
});
