import {IsString} from 'class-validator'
export class CitiesDto{
    @IsString()
    name:string;
}