import { ApiProperty } from '@nestjs/swagger';
import {IsString} from 'class-validator'
export class CitiesDto{
    @IsString()
    @ApiProperty()
    name:string;
}