import { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomerService {
    private customerModel;
    constructor(customerModel: Model<Customer>);
    getAllCustomer(user: {
        email: string;
    }): Promise<Customer[]>;
    createCustomer(customer: CreateCustomerDto, user: {
        email: string;
    }): Promise<{
        message: string;
        customer: Customer;
    }>;
    getCustomer(id: string, user: {
        email: string;
    }): Promise<Customer>;
    updateCustomerById(id: string, customer: Customer, user: {
        email: string;
    }): Promise<{
        message: string;
        customer: Customer;
    }>;
    deleteCustomerById(id: string): Promise<any>;
}
