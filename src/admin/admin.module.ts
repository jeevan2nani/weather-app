import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './admin.cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService],
})
export class AdminModule {}
