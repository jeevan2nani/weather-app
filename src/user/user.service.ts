import { Injectable} from '@nestjs/common';
import axios from 'axios';
import { AdminService } from 'src/admin/admin.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
    
    constructor(private adminService: AdminService,
        private readonly configService: ConfigService){};

    async getWeather(){
        // use configuration
        const API_KEY = this.getApiKey();

        const Citynames = await this.adminService.FindAll();
        console.log(typeof(Citynames));

        const weather_data = []; 

        for(const city of Citynames){

            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`;

            const response = await axios.get(URL);
            const obj = response.data.main;
            obj["name"] =city.name;
            weather_data.push(obj);

        }

        // console.log();

        return weather_data;

    }
    getApiKey(): string{
        return this.configService.get<string>('API_KEY');
    }

    async getWeatherforCity(city){
        const API_KEY = this.getApiKey();
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        console.log(URL);
        const response = await axios.get(URL);
        const obj = response.data.main;
        obj['name'] = city;
        console.log(obj);
        return obj;
    }
    async getAllCities(){
        return await this.adminService.FindAll();
    }
}