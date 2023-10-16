import { Injectable} from '@nestjs/common';
import axios from 'axios';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class UserService {
    
    constructor(private adminService: AdminService){};

    async getWeather(){
        const API_KEY = "2dd7d568e233080f1d1259ebb1818ece";

        const Citynames = await this.adminService.FindAll();
        console.log(typeof(Citynames));

        const weather_data = []; 

        for(const city of Citynames){

            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}`;

            const response = await axios.get(URL);

            weather_data.push(response.data);

        }

        // console.log();

        return weather_data;

    }
}