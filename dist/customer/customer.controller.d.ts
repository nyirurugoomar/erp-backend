import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './schemas/customer.schema';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    getAllCustomer(): Promise<Customer[]>;
    createCustomer(customer: CreateCustomerDto): Promise<{
        message: string;
        customer: Customer;
    }>;
    getCustomer(id: string): Promise<any>;
    updateCustomer(id: string, customer: Customer): Promise<any>;
    deleteCustomer(id: string): Promise<any>;
}
