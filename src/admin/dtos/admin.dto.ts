import { IsEmail, IsString } from "class-validator";
export default class AdminDto{
    @IsEmail()
    email:string;
    @IsString()
    password:string;
}