import { Test, TestingModule } from '@nestjs/testing';
import { LatestController } from './latest.controller';

describe('Latest Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LatestController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LatestController = module.get<LatestController>(LatestController);
    expect(controller).toBeDefined();
  });
});
