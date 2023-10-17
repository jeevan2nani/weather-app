import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './admin.cities.entity';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {

    constructor(@InjectRepository(City) private repo : Repository<City> , @InjectRepository(Admin) private adminRepo: Repository<Admin>,){};

    async AddCity(name:string){
        const city = await this.repo.create({name});
        this.repo.save(city);
        return " City is added to the DB";
    }
    async FindAll(){
        const cities =  await this.repo.find();
        return cities;
    }

    createUser(email:string,password:string){
        const user = this.adminRepo.create({email,password});
        this.adminRepo.save(user);
        return user;
    }
    async signin(email:string,password:string){
        const users = await this.adminRepo.find({where:{email:email}});
        const [user] = users;
        if(!user){
            return user;
        }

        if(user.password !== user.password){
            return null;
        }

        return user;
    }

    findById(id:number){
        return this.adminRepo.findOneBy({id});
    }
}
