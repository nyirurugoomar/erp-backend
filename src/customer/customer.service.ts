import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';


@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name) 
        private customerModel: Model<Customer>
    ){}

    async findAll(): Promise<Customer[]> {
        return this.customerModel.find().exec();
    }

    async createCustomer(customer:CreateCustomerDto):Promise<{message:string,customer:Customer}>{
        const createCustomer = await this.customerModel.create(customer)

        return {
            message:'Customer created successfully',
            customer:createCustomer
        }
    }

    async getCustomer(id:string):Promise<Customer>{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new BadRequestException('Invalid ID format')
        }
        const customer = await this.customerModel.findById(id).exec()
        if(!customer){
            throw new BadRequestException('Customer not found')
        }
        return customer
    }

    async updateCustomerById(id:string,customer:Customer):Promise<{message:string; customer:Customer}>{
        const updateCustomer = await this.customerModel.findByIdAndUpdate(id,customer,{
            new:true,
            runValidators:true
        })
        if(!updateCustomer){
            throw new BadRequestException('Customer not found')
        }

        return {
            message:'Customer updated successfully',
            customer:updateCustomer
        }
    }

    async deleteCustomerById(id:string):Promise<any>{
        const deleteCustomer = await this.customerModel.findByIdAndDelete(id)
        if(!deleteCustomer){
            throw new BadRequestException('Customer not found')
        }
        return {
            message:'Customer deleted successfully',
            customer:deleteCustomer
        }
    }


}
