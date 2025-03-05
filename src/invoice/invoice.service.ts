import { BadRequestException, Injectable } from '@nestjs/common';
import { Invoice } from './schemas/invoice.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectModel(Invoice.name)
        private invoiceModel:Model<Invoice>
    ){}

    async getAllInvoice():Promise<Invoice[]>{
        return await this.invoiceModel.find().exec()
    }
    async createInvoice(invoice:CreateInvoiceDto):Promise<{message:string; invoice:Invoice}>{
        const createInvoice = await this.invoiceModel.create(invoice)

        return {
            message:'Invoice created successfully',
            invoice:createInvoice
        }
    }

    async getInvoice(id:string):Promise<Invoice>{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new BadRequestException('Invalid ID format')
        }
        const invoice = await this.invoiceModel.findById(id).exec()
        if(!invoice){
            throw new BadRequestException('Invoice not found')
        }
        return invoice
    }
    async updateInvoiceById(id:string,invoice:Invoice):Promise<{message:string;invoice:Invoice}>{
        const updateInvoice = await this.invoiceModel.findByIdAndUpdate(id,invoice,{
            new:true,
            runValidators:true
        })
        if(!updateInvoice){
            throw new BadRequestException('Invoice not found')
        }

        return {
            message:'Invoice updated successfully',
            invoice:updateInvoice
        }
    }

    async deleteInvoiceById(id:string):Promise<any>{
        const deleteInvoice = await this.invoiceModel.findByIdAndDelete(id)
        if(!deleteInvoice){
            throw new BadRequestException('Invoice not found')
        }
        return {
            message:'Invoice deleted successfully',
            invoice:deleteInvoice
        }
    }
}
