import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './schemas/customer.schema';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    getAllCustomer(req: any): Promise<Customer[]>;
    createCustomer(customer: CreateCustomerDto, req: any): Promise<{
        message: string;
        customer: Customer;
    }>;
    getCustomer(id: string, req: any): Promise<any>;
    updateCustomer(id: string, customer: Customer, req: any): Promise<any>;
    deleteCustomer(id: string): Promise<any>;
}
