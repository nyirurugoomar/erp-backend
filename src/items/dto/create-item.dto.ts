import { IsString, IsNotEmpty } from 'class-validator';
export class CreateItemDto{
    @IsString()
    @IsNotEmpty()
    itemTitle: string;

    @IsString()
    @IsNotEmpty()
    itemDescription: string;

   
    @IsNotEmpty()
    initialQty: number;

    @IsNotEmpty()
    CurentQty: number;
    
    @IsNotEmpty()
    itemPrice: number;

    @IsNotEmpty()
    itemImage: number;

    


}