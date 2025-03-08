import { IsString, IsNotEmpty,IsNumber } from 'class-validator';

export class CreateCustomerDto{
    @IsString()
    @IsNotEmpty()
    customerName: string;

    @IsString()
    @IsNotEmpty()
    customerEmail: string;

    @IsString()
    @IsNotEmpty()
    customerAddress: string;

    @IsNumber()
    @IsNotEmpty()
    customerPhone: number;

    @IsString()
    @IsNotEmpty()
    customerImage: string;

    
}