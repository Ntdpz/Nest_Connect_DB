import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DbCheckService {
  constructor(
    @InjectDataSource('postgresConnection') // Inject DataSource ด้วยชื่อที่เราตั้งไว้
    private postgresDataSource: DataSource,
    @InjectDataSource('mysqlConnection') // Inject DataSource ด้วยชื่อที่เราตั้งไว้
    private mysqlDataSource: DataSource,
    @InjectDataSource('mssqlConnection') // Inject DataSource สำหรับ MSSQL
    private mssqlDataSource: DataSource,
    @InjectConnection('mongoConnection') // Inject Connection สำหรับ MongoDB
    private mongoConnection: Connection,
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

  async checkMysql(): Promise<boolean> {
    try {
      await this.mysqlDataSource.query('SELECT 1'); // คำสั่ง SQL สำหรับตรวจสอบการเชื่อมต่อ MySQL
      return true;
    } catch (error) {
      console.error('MySQL connection failed:', error.message);
      return false;
    }
  }

  async checkMssql(): Promise<boolean> {
    try {
      await this.mssqlDataSource.query('SELECT 1'); // คำสั่ง SQL สำหรับตรวจสอบการเชื่อมต่อ MSSQL
      return true;
    } catch (error) {
      console.error('MSSQL connection failed:', error.message);
      return false;
    }
  }

  async checkMongodb(): Promise<boolean> {
    try {
      // ตรวจสอบสถานะการเชื่อมต่อของ Mongoose
      return this.mongoConnection.readyState === 1; // 1 หมายถึง Connected
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      return false;
    }
  }
}
