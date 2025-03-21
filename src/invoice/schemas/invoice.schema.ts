import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { Document } from "mongoose";

export type InvoiceDocument = Invoice & Document;

@Schema()
export class InvoiceItem {
    @ApiProperty({ description: 'Unique identifier for the item' })
    @Prop({ required: true })
    itemId: string;

    @ApiProperty({ description: 'Title of the item' })
    @Prop({ required: true })
    itemTitle: string;

    @ApiProperty({ description: 'Detailed description of the item' })
    @Prop({ required: true })
    itemDescription: string;

    @ApiProperty({ description: 'Price of the item' })
    @Prop({ required: true })
    itemPrice: number;

    @ApiProperty({ description: 'Current quantity of the item' })
    @Prop({ required: true })
    currentQty: number;
}

// Create schema factory for InvoiceItem
export const InvoiceItemSchema = SchemaFactory.createForClass(InvoiceItem);

@Schema({
    timestamps: true,
})
export class Invoice {
    @ApiProperty({ description: 'Invoice Date' })
    @Prop({ required: true, type: Date })
    invoiceDate: Date;

    @ApiProperty({ description: 'Customer Name' })
    @Prop({ required: true })
    customerName: string;

    @ApiProperty({ description: 'Customer Email' })
    @Prop({ required: true })
    customerEmail: string;

    @ApiProperty({ description: 'Customer Address' })
    @Prop({ required: true })
    customerAddress: string;

    @ApiProperty({ description: 'Customer Phone' })
    @Prop({ required: true })
    customerPhone: string;

    @ApiProperty({ description: 'List of items in the invoice', type: [InvoiceItem] })
    @Prop({ type: [InvoiceItemSchema], required: true }) // Correctly defining array schema
    items: InvoiceItem[];

    @ApiProperty({ description: 'User who created the invoice' })
    @Prop({ required: true, type: Object })
    createdBy: { name: string; email: string };
}

// Create schema factory for Invoice
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
