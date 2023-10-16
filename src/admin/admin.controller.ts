import { Get,Body, Controller, Post } from '@nestjs/common';
import { CitiesDto } from './dtos/cities.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService){};

    @Post('/auth')
    addCity(@Body() body:CitiesDto){

        console.log(body);
        return this.adminService.AddCity(body.name);
    }
    // @Get('cities')
    // getAll(){
    //     return this.adminService.FindAll();
    // }
}
