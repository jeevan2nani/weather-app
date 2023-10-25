import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './admin.cities.entity';
import { Admin } from './admin.entity';
import { scrypt  as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AdminService {

    constructor(@InjectRepository(City) private repo : Repository<City> , @InjectRepository(Admin) private adminRepo: Repository<Admin>,){};

    async AddCity(name:string){
        const iscity = await this.FindCity(name);
        console.log(iscity);
        if(iscity === name){
            console.log(`City name is : ${iscity}`);
            return "City is already there in the Database!";
        }
        const city = await this.repo.create({name});
        this.repo.save(city);
        return " City is added to the DB";
    }
    async FindCity(name:string){
        const city = await this.repo.find({where:{name:name}});
        // console.log(city);
        return city[0].name;
    }
    async FindAll(){
        const cities =  await this.repo.find();
        return cities;
    }

    async createUser(email:string,password:string){
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password,salt,32)) as Buffer;
        const result = salt + '.'+hash.toString('hex');
        password= result;
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
        const [salt,storedHash] = user.password.split('.');
        const hash = (await scrypt(password,salt,32)) as Buffer;
        if(storedHash !== hash.toString('hex')){
            return null;
        }

        return user;
    }

    findById(id:number){
        return this.adminRepo.findOneBy({id});
    }
}
