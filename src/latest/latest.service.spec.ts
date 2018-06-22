import { Test, TestingModule } from '@nestjs/testing';
import { LatestService } from './latest.service';

describe('LatestService', () => {
  let service: LatestService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LatestService],
    }).compile();
    service = module.get<LatestService>(LatestService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
