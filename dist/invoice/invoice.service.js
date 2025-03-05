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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const invoice_schema_1 = require("./schemas/invoice.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let InvoiceService = class InvoiceService {
    constructor(invoiceModel) {
        this.invoiceModel = invoiceModel;
    }
    async getAllInvoice() {
        return await this.invoiceModel.find().exec();
    }
    async createInvoice(invoice) {
        const createInvoice = await this.invoiceModel.create(invoice);
        return {
            message: 'Invoice created successfully',
            invoice: createInvoice
        };
    }
    async getInvoice(id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid ID format');
        }
        const invoice = await this.invoiceModel.findById(id).exec();
        if (!invoice) {
            throw new common_1.BadRequestException('Invoice not found');
        }
        return invoice;
    }
    async updateInvoiceById(id, invoice) {
        const updateInvoice = await this.invoiceModel.findByIdAndUpdate(id, invoice, {
            new: true,
            runValidators: true
        });
        if (!updateInvoice) {
            throw new common_1.BadRequestException('Invoice not found');
        }
        return {
            message: 'Invoice updated successfully',
            invoice: updateInvoice
        };
    }
    async deleteInvoiceById(id) {
        const deleteInvoice = await this.invoiceModel.findByIdAndDelete(id);
        if (!deleteInvoice) {
            throw new common_1.BadRequestException('Invoice not found');
        }
        return {
            message: 'Invoice deleted successfully',
            invoice: deleteInvoice
        };
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(invoice_schema_1.Invoice.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map