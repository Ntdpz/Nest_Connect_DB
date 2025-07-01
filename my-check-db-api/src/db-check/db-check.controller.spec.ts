import { Test, TestingModule } from '@nestjs/testing';
import { DbCheckController } from './db-check.controller';

describe('DbCheckController', () => {
  let controller: DbCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbCheckController],
    }).compile();

    controller = module.get<DbCheckController>(DbCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
