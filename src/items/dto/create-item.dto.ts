import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto{
    @ApiProperty({
        description:'Item Title'
    })
    @IsString()
    @IsNotEmpty()
    itemTitle: string;

    @ApiProperty({
        description:'Item Description'
    })
    @IsString()
    @IsNotEmpty()
    itemDescription: string;

   
    @ApiProperty({
        description:'Item Initial Quantity'
    })
    @IsNotEmpty()
    initialQty: number;

    @ApiProperty({
        description:'Item Current Quantity'
    })
    @IsNotEmpty()
    CurentQty: number;
    
    @ApiProperty({
        description:'Item Price'
    })
    @IsNotEmpty()
    itemPrice: number;

    @ApiProperty({
        description:'Item Image'
    })
    @IsNotEmpty()
    itemImage: number;

    


}