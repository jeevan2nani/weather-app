import { Get,Body, Controller, Post, Session, BadRequestException, Req, UnauthorizedException } from '@nestjs/common';
import { CitiesDto } from './dtos/cities.dto';
import { AdminService } from './admin.service';
import { Request } from 'express'
import AdminDto from './dtos/admin.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('admin')
@ApiTags('admin')
export class AdminController {

    constructor(private adminService: AdminService){};

    // SignUp

    @Post('/signup')
    @ApiOperation({summary:"Admin Signup"})
    @ApiBody({type:AdminDto,description:"Signup Body"})
    @ApiResponse({status:200,description:'Admin Created Successful'})
    @ApiResponse({status:401,description:"Unauthorized"})
    signup(@Body() body:AdminDto , @Req() req:Request){
        if(req.session.userId === undefined){
            return new UnauthorizedException("Only Admins can Access this");
        }
        return this.adminService.createUser(body.email,body.password);
    }

    //SignIn
    // Add DTO for Sign in,Signup  -> Done
    @Post('/signin')
    @ApiOperation({summary:"Admin Login"})
    @ApiBody({type:AdminDto,description:"Login Body"})
    @ApiResponse({status:200,description:'Admin Logged In Successful', type:AdminDto})
    @ApiResponse({status:401,description:"Unauthorized"})
    async signin(@Body() body:AdminDto, @Req() req: Request){
        const admin = await this.adminService.signin(body.email,body.password);
        if(admin) {
           req.session.userId = admin.id;
        }
        else{
            return new UnauthorizedException("Invalid Credentials");
        }
        console.log(admin);
        return admin;
    }

    //Signout
    @Post('/signout')
    @ApiOperation({summary:"Admin Logout"})
    @ApiResponse({status:200,description:'Admin Logged out Successfully'})
    @ApiResponse({status:401,description:"Unauthorized"})
    signout(@Req() req:Request){
        if(req.session.userId === undefined){
            return new UnauthorizedException("Unauthorized");
        }
        req.session.userId = undefined;
        return JSON.parse('{"Message":"Logged Out Successfully"}');
    }


    @Post('/add')
    @ApiOperation({summary:"Adding Cities to DB"})
    @ApiBody({type:CitiesDto,description:"City Body"})
    @ApiResponse({status:200,description:'City Added Successful'})
    @ApiResponse({status:401,description:"Unauthorized"})
    async addCity(@Body() body:CitiesDto, @Req() req:Request){

        console.log(body);
        console.log(req.session.userId);
        if(req.session.userId === undefined ){
            return new BadRequestException("Please login as Admin to Access this");
        }
        return this.adminService.AddCity(body.name);
    }

}
