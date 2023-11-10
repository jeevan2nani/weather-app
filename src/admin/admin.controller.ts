import { Get,Body, Controller, Post, Session, BadRequestException, Req, UnauthorizedException } from '@nestjs/common';
import { CitiesDto } from './dtos/cities.dto';
import { AdminService } from './admin.service';
import { Request } from 'express'
import AdminDto from './dtos/admin.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './admin.entity';
import { AdminSessionService } from './admin.sessionService';

@Controller('admin')
@ApiTags('admin')
export class AdminController {

    constructor(private adminService: AdminService, private readonly adminSessionService:AdminSessionService){};

    // SignUp

    @Post('/signup')
    @ApiOperation({summary:"Admin Signup"})
    @ApiBody({type:AdminDto,description:"Signup Body"})
    @ApiResponse({status:201,description:'Admin Created Successful',type:Admin})
    @ApiResponse({status:401,description:"Unauthorized"})
    signup(@Body() body:AdminDto , @Req() req:Request){

        return this.adminService.createUser(body.email,body.password);
    }

    //SignIn
    // Add DTO for Sign in,Signup  -> Done
    @Post('/signin')
    @ApiOperation({summary:"Admin Login"})
    @ApiBody({type:AdminDto,description:"Login Body"})
    @ApiResponse({status:201,description:'Admin Logged In Successful', type:Admin})
    @ApiResponse({status:401,description:"Unauthorized"})
    async signin(@Body() body:AdminDto, @Req() req: Request){
        const admin = await this.adminService.signin(body.email,body.password);
        if(!admin){
            throw new UnauthorizedException("Invalid Credentials");
        }
        req.session.user = {
            userId: admin.id,
            userEmail: admin.email,
        }
        this.adminSessionService.addAdminSession(admin.id,admin.email);
        console.log(admin);
        return admin;
    }

    //Signout
    @Post('/signout')
    @ApiOperation({summary:"Admin Logout"})
    @ApiResponse({status:201,description:'Admin Logged out Successfully'})
    @ApiResponse({status:401,description:"Unauthorized"})
    async signout(@Req() req:Request){
        
        if(req.session && req.session.user){
            try {
                await this.adminSessionService.deleteAdminSession(req.session.user.userId);
                req.session.destroy();
                console.log("Session Destroyed");
                return JSON.parse('{"Message":"Logged Out Successfully"}');
            } catch (error) {
                console.log(error);
            }
        }
        else{
            throw new UnauthorizedException("Unauthorized");
        }
    }


    @Post('/add')
    @ApiOperation({summary:"Adding Cities to DB"})
    @ApiBody({type:CitiesDto,description:"City Body"})
    @ApiResponse({status:201,description:'City Added Successful'})
    @ApiResponse({status:401,description:"Unauthorized"})
    async addCity(@Body() body:CitiesDto, @Req() req:Request){

        console.log(body);
        console.log(req.session.userId);
        if(req.session.userId === undefined ){
            throw new UnauthorizedException("Please login as Admin to Access this");
        }
        return this.adminService.AddCity(body.name);
    }

}
