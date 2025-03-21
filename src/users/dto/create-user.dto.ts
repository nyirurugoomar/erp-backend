import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto{


    @ApiProperty({
        description:'name'
    })
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiProperty({
        description:'email'
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description:'password'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}