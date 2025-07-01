import { Test, TestingModule } from '@nestjs/testing';
import { DbCheckService } from './db-check.service';

describe('DbCheckService', () => {
  let service: DbCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbCheckService],
    }).compile();

    service = module.get<DbCheckService>(DbCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
