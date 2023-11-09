import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class City{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id:number;
    @Column()
    @ApiProperty()
    name:string;
}