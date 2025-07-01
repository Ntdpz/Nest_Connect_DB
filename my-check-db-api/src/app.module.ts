import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbCheckModule } from './db-check/db-check.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้ ConfigModule สามารถใช้ได้ทั่วทั้งแอป
      envFilePath: '.env', // ระบุว่าไฟล์ .env อยู่ที่ไหน
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'postgresConnection', // กำหนดชื่อ Connection
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        autoLoadEntities: true, // โหลด Entity โดยอัตโนมัติ
        synchronize: false, // ห้ามใช้ใน Production! ควรใช้ Migration แทน
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'mysqlConnection', // Connection สำหรับ MySQL
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // ประเภทฐานข้อมูลเป็น mysql
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'mssqlConnection', // Connection สำหรับ MSSQL
      useFactory: (configService: ConfigService) => ({
        type: 'mssql', // ประเภทฐานข้อมูลเป็น mssql
        host: configService.get<string>('MSSQL_HOST'),
        port: Number(configService.get<string>('MSSQL_PORT')),
        username: configService.get<string>('MSSQL_USERNAME'),
        password: configService.get<string>('MSSQL_PASSWORD'),
        database: configService.get<string>('MSSQL_DATABASE'),
        options: {
          encrypt: false, // Set to true if connecting to Azure SQL Database
        },
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),

    MongooseModule.forRootAsync({
      // เพิ่ม MongooseModule สำหรับ MongoDB
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: 'mongoConnection', // กำหนดชื่อ Connection สำหรับ Mongoose
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    DbCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
