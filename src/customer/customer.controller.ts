import { Body, Controller, Get,Post, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './schemas/customer.schema';
import { AuthGuard } from '../users/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('customer')
export class CustomerController {
    constructor(
        private customerService:CustomerService
    ){}

    @UseGuards(AuthGuard)
    @Get()
    async getAllCustomer(@Req() req):Promise<Customer[]>{
        console.log(req.user);
        return await this.customerService.getAllCustomer(req.user)
    }


    @UseGuards(AuthGuard)
    @Post()
    async createCustomer(@Body() customer:CreateCustomerDto,@Req() req):Promise<{message:string,customer:Customer}>{
        return await this.customerService.createCustomer(customer,req.user)
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getCustomer(@Param('id') id:string,@Req() req):Promise<any>{
        return await this.customerService.getCustomer(id,req.user)
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    async updateCustomer(@Param('id') id:string,@Body() customer:Customer,@Req() req):Promise<any>{
        return await this.customerService.updateCustomerById(id,customer,req.user)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteCustomer(@Param('id') id:string):Promise<any>{
        return await this.customerService.deleteCustomerById(id)
    }

}
