import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto{


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