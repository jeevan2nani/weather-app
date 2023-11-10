import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './admin.cities.entity';
import { Admin } from './admin.entity';
import { AdminSessionService } from './admin.sessionService';
import { AuthMiddleWare } from './middleware/authMiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([City,Admin])],
  controllers: [AdminController],
  providers: [AdminService,AdminSessionService],
  exports:[AdminService],
})
export class AdminModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare)
    .forRoutes('admin/add', 'admin/signup');
  }
}
