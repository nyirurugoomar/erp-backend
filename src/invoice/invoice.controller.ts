import { Body, Controller, Get,Post,Param,Put,Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './schemas/invoice.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoice')
export class InvoiceController {
    constructor(
        private invoiceService: InvoiceService
    ){}

    @Get()
    async getAllItem():Promise<Invoice[]>{
        return await this.invoiceService.getAllInvoice()
    }

    @Post()
    async createInvoice(@Body() createInvoice:CreateInvoiceDto):Promise<{message:string;invoice:Invoice}>{
        return await this.invoiceService.createInvoice(createInvoice)
    }

    @Get(':id')
    async getInvoice(@Param('id') id:string):Promise<Invoice>{
        return await this.invoiceService.getInvoice(id)
    }

    @Put(':id')
    async updateInvoice(
        @Param('id')
         id:string,
         @Body()
         invoice:Invoice
    ):Promise<{message:string;invoice:Invoice}>{
        return  this.invoiceService.updateInvoiceById(id,invoice)
    }

    @Delete(':id')
    async deleteInvoice(@Param('id') id:string):Promise<any>{
        return await this.invoiceService.deleteInvoiceById(id)
    }


}
