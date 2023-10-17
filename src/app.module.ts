import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './admin/admin.cities.entity';
import { UserModule } from './user/user.module';
import { Admin } from './admin/admin.entity';
@Module({
  imports: [AdminModule, TypeOrmModule.forRoot(
    {
      type:'sqlite',
      database:'db.sqlite',
      entities:[City,Admin],
      synchronize:true,
    }
  ), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}