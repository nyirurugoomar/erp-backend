export declare class Invoice {
    invoiceDate: Date;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    customerPhone: string;
    items: Array<{
        itemId: string;
        itemTitle: string;
        itemDescription: string;
        itemPrice: number;
        CurentQty: number;
    }>;
    createdBy: {
        name: string;
        email: string;
    };
}
export declare const InvoiceSchema: import("mongoose").Schema<Invoice, import("mongoose").Model<Invoice, any, any, any, import("mongoose").Document<unknown, any, Invoice> & Invoice & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Invoice, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Invoice>> & import("mongoose").FlatRecord<Invoice> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
