import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { AdminService } from 'src/admin/admin.service';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[AdminModule],
})
export class UserModule {}
