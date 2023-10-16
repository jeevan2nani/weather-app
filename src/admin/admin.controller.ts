import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {

    @Get()
    create(){
        return "Hello-HHH!";
    }

}
