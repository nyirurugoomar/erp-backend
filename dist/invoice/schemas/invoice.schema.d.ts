import { Document } from "mongoose";
export type InvoiceDocument = Invoice & Document;
export declare class InvoiceItem {
    itemId: string;
    itemTitle: string;
    itemDescription: string;
    itemPrice: number;
    currentQty: number;
}
export declare const InvoiceItemSchema: import("mongoose").Schema<InvoiceItem, import("mongoose").Model<InvoiceItem, any, any, any, Document<unknown, any, InvoiceItem> & InvoiceItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InvoiceItem, Document<unknown, {}, import("mongoose").FlatRecord<InvoiceItem>> & import("mongoose").FlatRecord<InvoiceItem> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Invoice {
    invoiceDate: Date;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    customerPhone: string;
    items: InvoiceItem[];
    createdBy: {
        name: string;
        email: string;
    };
}
export declare const InvoiceSchema: import("mongoose").Schema<Invoice, import("mongoose").Model<Invoice, any, any, any, Document<unknown, any, Invoice> & Invoice & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Invoice, Document<unknown, {}, import("mongoose").FlatRecord<Invoice>> & import("mongoose").FlatRecord<Invoice> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
