import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';

@Schema({
    timestamps: true,
})

export class Customer{
        
         @ApiProperty({
            description:'Customer Name'
        })
        @Prop({ required: true })
        customerName: string;


        @ApiProperty({
            description:'Customer Email'
        })
        @Prop({ required: true })
        customerEmail: string;
    
        @ApiProperty({
            description:'Customer Address'
        })
        @Prop({ required: true })
        customerAddress: string;
    
        @ApiProperty({
            description:'Customer Number'
        })
        @Prop({ required: true})
        customerPhone: number;
    
        @ApiProperty({
            description:'Customer Image'
        })
        @Prop({ required: true })
        customerImage: string;

        @Prop({ required: true, type: Object }) 
        createdBy: { name: string; email: string };


}
export const CustomerSchema = SchemaFactory.createForClass(Customer);