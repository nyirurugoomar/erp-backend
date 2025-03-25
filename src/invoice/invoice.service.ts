import { BadRequestException, Injectable,Inject } from '@nestjs/common';
import { Invoice } from './schemas/invoice.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class InvoiceService {
    constructor(
        @InjectModel(Invoice.name)
        private invoiceModel:Model<Invoice>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}

    async getAllInvoice(user:{email:string,name:string}):Promise<Invoice[]>{
        const cacheKey = `invoice:${user.email}`;
        const cachedInvoice = await this.cacheManager.get(cacheKey);
        if(cachedInvoice){
            return cachedInvoice as any
        }
        const invoice = await this.invoiceModel.find({'createdBy.email':user.email}).exec()
        await this.cacheManager.set(cacheKey,invoice)
        return invoice
    }
    async createInvoice(invoice:CreateInvoiceDto,user:{name:string; email:string}):Promise<{message:string; invoice:Invoice}>{
        const createInvoice = await this.invoiceModel.create({ ...invoice,createdBy:user.email})
        await this.cacheManager.del(`invoice:${user.email}`)
        return {
            message:'Invoice created successfully',
            invoice:createInvoice
        }
    }

    async getInvoice(id:string,user:{email:string}):Promise<Invoice>{
        const cacheKey = `invoice:${id}`;
        const cachedInvoice = await this.cacheManager.get(cacheKey);
        if(cachedInvoice){
            return cachedInvoice as Invoice;
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new BadRequestException('Invalid ID format')
        }
        const invoice = await this.invoiceModel.findById({_id:id, 'createdBy.email': user.email}).exec()
        if(!invoice){
            throw new BadRequestException('Invoice not found')
        }
        await this.cacheManager.set(cacheKey, invoice)
        return invoice
    }
    async updateInvoiceById(id:string,invoice:Invoice,user:{email:string}):Promise<{message:string;invoice:Invoice}>{
        const updateInvoice = await this.invoiceModel.findByIdAndUpdate({_id:id,'createdBy.email':user.email},invoice,{
            new:true,
            runValidators:true
        })
        if(!updateInvoice){
            throw new BadRequestException('Invoice not found')
        }
        await this.cacheManager.del(`invoice:${id}`)
        await this.cacheManager.del(`invoice:${user.email}`)
        
        return {
            message:'Invoice updated successfully',
            invoice:updateInvoice
        }
    }

    async deleteInvoiceById(id:string,user:{email:string}):Promise<any>{
        const deleteInvoice = await this.invoiceModel.findByIdAndDelete({id,'createdBy.email':user.email}).exec()
        if(!deleteInvoice){
            throw new BadRequestException('Invoice not found')
        }
        await this.cacheManager.del(`invoice:${id}`)
        await this.cacheManager.del(`invoice:${user.email}`)
        return {
            message:'Invoice deleted successfully',
            invoice:deleteInvoice
        }
    }
}
