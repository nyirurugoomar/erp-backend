import { InvoiceService } from './invoice.service';
import { Invoice } from './schemas/invoice.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoiceController {
    private invoiceService;
    constructor(invoiceService: InvoiceService);
    getAllItem(): Promise<Invoice[]>;
    createInvoice(createInvoice: CreateInvoiceDto): Promise<{
        message: string;
        invoice: Invoice;
    }>;
    getInvoice(id: string): Promise<Invoice>;
    updateInvoice(id: string, invoice: Invoice): Promise<{
        message: string;
        invoice: Invoice;
    }>;
    deleteInvoice(id: string): Promise<any>;
}
