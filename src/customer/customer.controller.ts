import { Body, Controller, Get,Post, Param, Delete, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './schemas/customer.schema';

@Controller('customer')
export class CustomerController {
    constructor(
        private customerService:CustomerService
    ){}

    @Get()
    async getAllCustomer(){
        return await this.customerService.findAll()
    }


    @Post()
    async createCustomer(@Body() customer:CreateCustomerDto):Promise<{message:string,customer:Customer}>{
        return await this.customerService.createCustomer(customer)
    }

    @Get(':id')
    async getCustomer(@Param('id') id:string):Promise<any>{
        return await this.customerService.getCustomer(id)
    }

    @Put(':id')
    async updateCustomer(@Param('id') id:string,@Body() customer:Customer):Promise<any>{
        return await this.customerService.updateCustomerById(id,customer)
    }

    @Delete(':id')
    async deleteCustomer(@Param('id') id:string):Promise<any>{
        return await this.customerService.deleteCustomerById(id)
    }

}
