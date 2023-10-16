import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './admin.cities.entity';

@Injectable()
export class AdminService {

    constructor(@InjectRepository(City) private repo : Repository<City> ){};

    async AddCity(name:string){
        const city = await this.repo.create({name});
        this.repo.save(city);
        return " City is added to the DB";
    }

    async FindAll(){
        const cities =  await this.repo.find();

        const citiesArray = [];

        for(const city of cities){

        }

        return cities;
    }

}
