import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DbCheckService } from './db-check.service';

@Controller('check-db')
export class DbCheckController {
  constructor(private readonly dbCheckService: DbCheckService) {}

  @Get(':dbName')
  async checkDatabase(@Param('dbName') dbName: string, @Res() res: Response) {
    let isConnected: boolean;
    let message: string;

    switch (dbName.toLowerCase()) {
      case 'postgres':
        isConnected = await this.dbCheckService.checkPostgres();
        message = isConnected
          ? 'PostgreSQL connected successfully.'
          : 'Failed to connect to PostgreSQL.';
        break;
      // จะเพิ่ม case สำหรับ DB อื่นๆ ในภายหลัง

      case 'mysql': // เพิ่ม Case สำหรับ MySQL
        isConnected = await this.dbCheckService.checkMysql();
        message = isConnected
          ? 'MySQL connected successfully.'
          : 'Failed to connect to MySQL.';
        break;

      case 'mssql': // เพิ่ม Case สำหรับ MSSQL
        isConnected = await this.dbCheckService.checkMssql();
        message = isConnected
          ? 'MSSQL connected successfully.'
          : 'Failed to connect to MSSQL.';
        break;

      case 'mongodb': // เพิ่ม Case สำหรับ MongoDB
        isConnected = await this.dbCheckService.checkMongodb();
        message = isConnected
          ? 'MongoDB connected successfully.'
          : 'Failed to connect to MongoDB.';
        break;
      default:
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: 'error',
          message: `Unknown database: ${dbName}. Available databases: postgres.`,
        });
    }

    if (isConnected) {
      return res.status(HttpStatus.OK).json({
        status: 'success',
        database: dbName,
        connected: true,
        message: message,
      });
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        database: dbName,
        connected: false,
        message: message,
      });
    }
  }
}
