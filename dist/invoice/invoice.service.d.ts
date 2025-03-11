import { Invoice } from './schemas/invoice.schema';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoiceService {
    private invoiceModel;
    constructor(invoiceModel: Model<Invoice>);
    getAllInvoice(user: {
        email: string;
        name: string;
    }): Promise<Invoice[]>;
    createInvoice(invoice: CreateInvoiceDto, user: {
        name: string;
        email: string;
    }): Promise<{
        message: string;
        invoice: Invoice;
    }>;
    getInvoice(id: string, user: {
        email: string;
    }): Promise<Invoice>;
    updateInvoiceById(id: string, invoice: Invoice, user: {
        email: string;
    }): Promise<{
        message: string;
        invoice: Invoice;
    }>;
    deleteInvoiceById(id: string, user: {
        email: string;
    }): Promise<any>;
}
