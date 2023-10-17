import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './admin.cities.entity';
import { Admin } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City,Admin])],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService],
})
export class AdminModule {}
