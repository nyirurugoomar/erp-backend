import { IsString, IsNotEmpty,IsNumber,IsArray,ValidateNested  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
class InvoiceItemDto {
    @ApiProperty({ description: 'Unique identifier for the item' })
    @IsString()
    @IsNotEmpty()
    itemId: string;

    @ApiProperty({ description: 'Title of the item' })
    @IsString()
    @IsNotEmpty()
    itemTitle: string;

    @ApiProperty({ description: 'Detailed description of the item' })
    @IsString()
    @IsNotEmpty()
    itemDescription: string;

    @ApiProperty({ description: 'Price of the item' })
    @IsNumber()
    @IsNotEmpty()
    itemPrice: number;

    @ApiProperty({ description: 'Current quantity of the item' })
    @IsNumber()
    @IsNotEmpty()
    currentQty: number;
}

export class CreateInvoiceDto{

    @ApiProperty({
        description:'Invoice Date'
    })
    @IsString()
    @IsNotEmpty()
    invoiceDate: string

    @ApiProperty({
        description:'Customer Name'
    })
    @IsString()
    @IsNotEmpty()
    customerName:string

    @ApiProperty({
        description:'Customer Email'
    })
    @IsString()
    @IsNotEmpty()
    customerEmail:string

    @ApiProperty({
        description:'Customer Address'
    })
    @IsString()
    @IsNotEmpty()
    customerAddress:string

    @ApiProperty({
        description:'Customer Phone'
    })
    @IsString()
    @IsNotEmpty()
    customerPhone:string

    @ApiProperty({
        description: 'List of items in the invoice',
        type: [InvoiceItemDto], // Correctly defining array of objects
    })
    @IsArray()
    @ValidateNested({ each: true }) // Validate each item separately
    @Type(() => InvoiceItemDto) // Ensure transformation to DTO class
    items: InvoiceItemDto[];


}