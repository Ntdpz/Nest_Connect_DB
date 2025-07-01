import { Module } from '@nestjs/common';
import { DbCheckController } from './db-check.controller';
import { DbCheckService } from './db-check.service';

@Module({
  controllers: [DbCheckController],
  providers: [DbCheckService]
})
export class DbCheckModule {}
