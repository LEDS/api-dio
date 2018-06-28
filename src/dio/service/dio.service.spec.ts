import { Test, TestingModule } from '@nestjs/testing';
import { DioService } from './dio.service';

describe('DioService', () => {
  let service: DioService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DioService],
    }).compile();
    service = module.get<DioService>(DioService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
