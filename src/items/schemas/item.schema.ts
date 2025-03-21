import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';



@Schema({ timestamps: true })


export class Item{
    @ApiProperty({
        description:'Item Title'
    })
    @Prop({ required: true, unique: true })
    itemTitle: string; 

    @ApiProperty({
        description:'Item Description'
    })
    @Prop({ required: true, unique: true })
    itemDescription: string;

    @ApiProperty({
        description:'Item Initial Quantity'
    })  
    @Prop({ required: true, unique: true })
    initialQty: number;

    @ApiProperty({
        description:'Item Current Quantity'
    })   
    @Prop({ required: true, unique: true })
    CurentQty: number;

    @ApiProperty({
        description:'Item Price'
    })  
    @Prop({ required: true, unique: true })
    itemPrice: number;

    @ApiProperty({
        description:'Item Image'
    })
    @Prop({ required: true, unique: true })
    itemImage: string;

    @Prop({ required: true, type: Object }) 
    createdBy: { name: string; email: string };
}
export const ItemSchema = SchemaFactory.createForClass(Item)