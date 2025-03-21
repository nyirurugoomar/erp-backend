import { IsString, IsNotEmpty,IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto{

    @ApiProperty({
        description:'Customer Name'
    })
    @IsString()
    @IsNotEmpty()
    customerName: string;

    @ApiProperty({
        description:'Customer Email'
    })
    @IsString()
    @IsNotEmpty()
    customerEmail: string;


    @ApiProperty({
        description:'Customer Address'
    })
    @IsString()
    @IsNotEmpty()
    customerAddress: string;

    @ApiProperty({
        description:'Customer Phone'
    })
    @IsNumber()
    @IsNotEmpty()
    customerPhone: number;

    @ApiProperty({
        description:'Customer Image'
    })
    @IsString()
    @IsNotEmpty()
    customerImage: string;

    
}