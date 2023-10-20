import { Get,Body, Controller, Post, Session, BadRequestException, Req } from '@nestjs/common';
import { CitiesDto } from './dtos/cities.dto';
import { AdminService } from './admin.service';
import { Request } from 'express'

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
    async signin(@Body() body:any, @Req() req: Request){
        const admin = await this.adminService.signin(body.email,body.password);
        if(admin) {
           req.session.userId = admin.id;
            console.log(req.session.userId);
            if(req.session.userId === undefined){
                console.log("Check");
            }
        }
        console.log(admin);
        return admin;
    }

    //Signout
    @Post('/signout')
    signout(@Req() req:Request){
        req.session.userId = undefined;
        return "Logged Out Successfully";
    }


    @Post('/add')
    async addCity(@Body() body:CitiesDto, @Req() req:Request){

        console.log(body);
        console.log(req.session.userId);
        if(req.session.userId === undefined ){
            return new BadRequestException("Please login as Admin to Access this");
        }
        return this.adminService.AddCity(body.name);
    }

}
