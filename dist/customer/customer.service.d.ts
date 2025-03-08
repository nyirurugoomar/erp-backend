import { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomerService {
    private customerModel;
    constructor(customerModel: Model<Customer>);
    findAll(): Promise<Customer[]>;
    createCustomer(customer: CreateCustomerDto): Promise<{
        message: string;
        customer: Customer;
    }>;
    getCustomer(id: string): Promise<Customer>;
    updateCustomerById(id: string, customer: Customer): Promise<{
        message: string;
        customer: Customer;
    }>;
    deleteCustomerById(id: string): Promise<any>;
}
