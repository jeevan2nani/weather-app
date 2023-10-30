import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './admin/admin.cities.entity';
import { UserModule } from './user/user.module';
import { Admin } from './admin/admin.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [AdminModule, ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true,
  }), 
  TypeOrmModule.forRoot(
    {
      type:'postgres',
      // url: process.env.DATABASE_URL,
      database:process.env.POSTGRESDB,
      username:process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PASSWORD,
      host:"postgres",
      port:5432,
      entities:[City,Admin],
      synchronize:true,
    }
  ),
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}