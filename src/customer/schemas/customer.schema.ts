import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})

export class Customer{
        
        @Prop({ required: true })
        customerName: string;
    
        @Prop({ required: true })
        customerEmail: string;
    
        @Prop({ required: true })
        customerAddress: string;
    
        @Prop({ required: true})
        customerPhone: number;
    
        @Prop({ required: true })
        customerImage: string;

        @Prop({ required: true, type: Object }) 
        createdBy: { name: string; email: string };


}
export const CustomerSchema = SchemaFactory.createForClass(Customer);