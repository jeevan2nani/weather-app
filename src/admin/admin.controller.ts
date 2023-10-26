import { Get,Body, Controller, Post, Session, BadRequestException, Req, UnauthorizedException } from '@nestjs/common';
import { CitiesDto } from './dtos/cities.dto';
import { AdminService } from './admin.service';
import { Request } from 'express'
import AdminDto from './dtos/admin.dto';

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService){};

    // SignUp

    @Post('/signup')
    signup(@Body() body:AdminDto , @Req() req:Request){
        if(req.session.userId === undefined){
            return {"Message":"Only Admins can Access this"};
        }
        return this.adminService.createUser(body.email,body.password);
    }

    //SignIn
    // Add DTO for Sign in,Signup  -> Done
    @Post('/signin')
    async signin(@Body() body:AdminDto, @Req() req: Request){
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
        return {"Message":"Logged Out Successfully"};
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
