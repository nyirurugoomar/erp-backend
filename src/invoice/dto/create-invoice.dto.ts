import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto{
    @IsString()
    @IsNotEmpty()
    invoiceDate: string

    @IsString()
    @IsNotEmpty()
    customerName:string

    @IsString()
    @IsNotEmpty()
    customerEmail:string

    @IsString()
    @IsNotEmpty()
    customerAddress:string

    @IsString()
    @IsNotEmpty()
    customerPhone:string

    @IsString()
    @IsNotEmpty()
    items:string


}