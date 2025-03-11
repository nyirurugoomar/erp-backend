"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const customer_schema_1 = require("./schemas/customer.schema");
let CustomerService = class CustomerService {
    constructor(customerModel) {
        this.customerModel = customerModel;
    }
    async getAllCustomer(user) {
        try {
            return await this.customerModel.find({ createdBy: user.email }).exec();
        }
        catch (error) {
            console.error('Error fetching customers:', error);
            throw new common_1.BadRequestException('Failed to fetch customers');
        }
    }
    async createCustomer(customer, user) {
        const createCustomer = await this.customerModel.create({ ...customer, createdBy: user.email });
        return {
            message: 'Customer created successfully',
            customer: createCustomer
        };
    }
    async getCustomer(id, user) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid ID format');
        }
        const customer = await this.customerModel.findById({ _id: id, 'createdBy.email': user.email }).exec();
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        return customer;
    }
    async updateCustomerById(id, customer, user) {
        const updateCustomer = await this.customerModel.findByIdAndUpdate({ _id: id, 'createdBy.email': user.email }, customer, {
            new: true,
            runValidators: true
        });
        if (!updateCustomer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        return {
            message: 'Customer updated successfully',
            customer: updateCustomer
        };
    }
    async deleteCustomerById(id) {
        const deleteCustomer = await this.customerModel.findByIdAndDelete(id);
        if (!deleteCustomer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        return {
            message: 'Customer deleted successfully',
            customer: deleteCustomer
        };
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(customer_schema_1.Customer.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CustomerService);
//# sourceMappingURL=customer.service.js.map