import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class DbCheckService {
  constructor(
    @InjectDataSource('postgresConnection') // Inject DataSource ด้วยชื่อที่เราตั้งไว้
    private postgresDataSource: DataSource,
  ) {}

  async checkPostgres(): Promise<boolean> {
    try {
      await this.postgresDataSource.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('PostgreSQL connection failed:', error.message);
      return false;
    }
  }
}
