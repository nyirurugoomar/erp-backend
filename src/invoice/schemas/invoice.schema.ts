import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})

export class Invoice{
    
    @Prop({ required: true })
    invoiceDate: Date;

    @Prop({ required: true })
    customerName: string;

    @Prop({ required: true })
    customerEmail: string;

    @Prop({ required: true })
    customerAddress: string;

    @Prop({ required: true})
    customerPhone: string;

    @Prop({ required: true })
    items: Array<{itemId: string,itemTitle:string, itemDescription: string,itemPrice:number, CurentQty:number }>;

    @Prop({ required: true, type: Object }) 
    createdBy: { name: string; email: string };




}
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);