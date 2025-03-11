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

    async getAllCustomer(user: { email: string }): Promise<Customer[]> {
        try {
            return await this.customerModel.find({ createdBy: user.email }).exec();
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw new BadRequestException('Failed to fetch customers');
        }
    }

    async createCustomer(customer:CreateCustomerDto,user:{email:string}):Promise<{message:string,customer:Customer}>{
        const createCustomer = await this.customerModel.create({ ...customer,createdBy:user.email})

        return {
            message:'Customer created successfully',
            customer:createCustomer
        }
    }

    async getCustomer(id:string, user:{email:string}):Promise<Customer>{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new BadRequestException('Invalid ID format')
        }
        const customer = await this.customerModel.findById({_id:id,'createdBy.email':user.email}).exec()
        if(!customer){
            throw new BadRequestException('Customer not found')
        }
        return customer
    }

    async updateCustomerById(id:string,customer:Customer,user:{email:string}):Promise<{message:string; customer:Customer}>{
        const updateCustomer = await this.customerModel.findByIdAndUpdate({_id:id,'createdBy.email':user.email},customer,{
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
