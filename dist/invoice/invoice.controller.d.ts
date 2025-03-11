import { InvoiceService } from './invoice.service';
import { Invoice } from './schemas/invoice.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoiceController {
    private invoiceService;
    constructor(invoiceService: InvoiceService);
    getAllItem(req: any): Promise<Invoice[]>;
    createInvoice(createInvoice: CreateInvoiceDto, req: any): Promise<{
        message: string;
        invoice: Invoice;
    }>;
    getInvoice(id: string, req: any): Promise<Invoice>;
    updateInvoice(id: string, invoice: Invoice, req: any): Promise<{
        message: string;
        invoice: Invoice;
    }>;
    deleteInvoice(req: any, id: string): Promise<any>;
}
