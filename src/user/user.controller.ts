import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation,ApiResponse } from '@nestjs/swagger';
import { CitiesDto } from 'src/admin/dtos/cities.dto';
import { City } from 'src/admin/admin.cities.entity';
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
    @ApiOperation({summary:"API to fetch Data of the selected city"})
    @ApiResponse({status:200,description:"Weather data of the selected city is fetched Successfully"})
    getWeatherforCity(@Query('city') city:string){
        console.log(city);
        console.log("CHECK");
        return this.userService.getWeatherforCity(city);
    }
    @Get('/all')
    @ApiOperation({summary:"API to get all city names present in DB"})
    @ApiResponse({status:200,description:"City Data fetched Successfully",type:City,isArray:true})
    getAllCities(){
        return this.userService.getAllCities();
    }
}
