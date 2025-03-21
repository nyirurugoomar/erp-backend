declare class InvoiceItemDto {
    itemId: string;
    itemTitle: string;
    itemDescription: string;
    itemPrice: number;
    currentQty: number;
}
export declare class CreateInvoiceDto {
    invoiceDate: string;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    customerPhone: string;
    items: InvoiceItemDto[];
}
export {};
