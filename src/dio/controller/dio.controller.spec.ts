import { Test, TestingModule } from '@nestjs/testing';
import { DioController } from './dio.controller';

describe('Dio Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DioController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: DioController = module.get<DioController>(DioController);
    expect(controller).toBeDefined();
  });
});
