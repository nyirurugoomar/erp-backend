import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({ timestamps: true })


export class Item{
    @Prop({ required: true, unique: true })
    itemTitle: string; 

    @Prop({ required: true, unique: true })
    itemDescription: string;

    @Prop({ required: true, unique: true })
    initialQty: number;

    @Prop({ required: true, unique: true })
    CurentQty: number;

    @Prop({ required: true, unique: true })
    itemImage: string;
}
export const ItemSchema = SchemaFactory.createForClass(Item)