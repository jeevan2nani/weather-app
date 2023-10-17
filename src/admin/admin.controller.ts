import { Get,Body, Controller, Post, Session, BadRequestException } from '@nestjs/common';
import { CitiesDto } from './dtos/cities.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService){};

    // SignUp

    @Post('/signup')
    signup(@Body() body:any ){
        return this.adminService.createUser(body.email,body.password);
    }

    //SignIn

    @Post('/signin')
    async signin(@Body() body:any, @Session() session:any){
        const admin = await this.adminService.signin(body.email,body.password);
        if(admin) {
            session.userId = admin.id;
        }
        return admin;
    }

    //Signout
    @Post('/signout')
    signout(@Session() session:any){
        session.userId = null;
        return "Logged Out Successfully";
    }


    @Post('/add')
    async addCity(@Body() body:CitiesDto, @Session() session:any){

        console.log(body);
        if(session.userId === null){
            return new BadRequestException("Please login as Admin to Access this");
        }
        return this.adminService.AddCity(body.name);
    }

}
