import { Body, Controller, Get,Post,Param,Put,Delete, UseGuards, Req } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './schemas/invoice.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { AuthGuard } from '../users/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('invoice')
export class InvoiceController {
    constructor(
        private invoiceService: InvoiceService
    ){}

    @UseGuards(AuthGuard)
    @Get()
    async getAllItem(@Req() req):Promise<Invoice[]>{
        return await this.invoiceService.getAllInvoice(req.user)
    }

    @UseGuards(AuthGuard)
    @Post()
    async createInvoice(@Body() createInvoice:CreateInvoiceDto,@Req() req):Promise<{message:string;invoice:Invoice}>{
        return await this.invoiceService.createInvoice(createInvoice,req.user)
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getInvoice(@Param('id') id:string, @Req() req):Promise<Invoice>{
        return await this.invoiceService.getInvoice(id,req.user)
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updateInvoice(
        @Param('id')
         id:string,
         @Body()
         invoice:Invoice,
         @Req() req
    ):Promise<{message:string;invoice:Invoice}>{
        return  this.invoiceService.updateInvoiceById(id,invoice,req.user)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteInvoice(@Param('id') @Req() req, id:string):Promise<any>{
        return await this.invoiceService.deleteInvoiceById(id,req.user)
    }


}
