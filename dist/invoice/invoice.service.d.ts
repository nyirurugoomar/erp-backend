import { Invoice } from './schemas/invoice.schema';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoiceService {
    private invoiceModel;
    constructor(invoiceModel: Model<Invoice>);
    getAllInvoice(): Promise<Invoice[]>;
    createInvoice(invoice: CreateInvoiceDto): Promise<{
        message: string;
        invoice: Invoice;
    }>;
    getInvoice(id: string): Promise<Invoice>;
    updateInvoiceById(id: string, invoice: Invoice): Promise<{
        message: string;
        invoice: Invoice;
    }>;
    deleteInvoiceById(id: string): Promise<any>;
}
