import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbCheckModule } from './db-check/db-check.module';

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
    DbCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
