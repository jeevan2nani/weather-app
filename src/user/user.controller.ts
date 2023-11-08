import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation,ApiResponse } from '@nestjs/swagger';
@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private userService: UserService){};

    @Get('/weather')
    @ApiOperation({summary:"Getting weather details of All Cities present in DB"})
    @ApiResponse({status:200,description:'Weather Data fetched Successfully'})
    getWeather(){

        return this.userService.getWeather();
    }

    @Get('/city')
    getWeatherforCity(@Query('city') city:string){
        console.log(city);
        console.log("CHECK");
        return this.userService.getWeatherforCity(city);
    }
    @Get('/all')
    getAllCities(){
        return this.userService.getAllCities();
    }
}
