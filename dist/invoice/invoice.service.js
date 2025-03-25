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
const cache_manager_1 = require("@nestjs/cache-manager");
let InvoiceService = class InvoiceService {
    constructor(invoiceModel, cacheManager) {
        this.invoiceModel = invoiceModel;
        this.cacheManager = cacheManager;
    }
    async getAllInvoice(user) {
        const cacheKey = `invoice:${user.email}`;
        const cachedInvoice = await this.cacheManager.get(cacheKey);
        if (cachedInvoice) {
            return cachedInvoice;
        }
        const invoice = await this.invoiceModel.find({ 'createdBy.email': user.email }).exec();
        await this.cacheManager.set(cacheKey, invoice);
        return invoice;
    }
    async createInvoice(invoice, user) {
        const createInvoice = await this.invoiceModel.create({ ...invoice, createdBy: user.email });
        await this.cacheManager.del(`invoice:${user.email}`);
        return {
            message: 'Invoice created successfully',
            invoice: createInvoice
        };
    }
    async getInvoice(id, user) {
        const cacheKey = `invoice:${id}`;
        const cachedInvoice = await this.cacheManager.get(cacheKey);
        if (cachedInvoice) {
            return cachedInvoice;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid ID format');
        }
        const invoice = await this.invoiceModel.findById({ _id: id, 'createdBy.email': user.email }).exec();
        if (!invoice) {
            throw new common_1.BadRequestException('Invoice not found');
        }
        await this.cacheManager.set(cacheKey, invoice);
        return invoice;
    }
    async updateInvoiceById(id, invoice, user) {
        const updateInvoice = await this.invoiceModel.findByIdAndUpdate({ _id: id, 'createdBy.email': user.email }, invoice, {
            new: true,
            runValidators: true
        });
        if (!updateInvoice) {
            throw new common_1.BadRequestException('Invoice not found');
        }
        await this.cacheManager.del(`invoice:${id}`);
        await this.cacheManager.del(`invoice:${user.email}`);
        return {
            message: 'Invoice updated successfully',
            invoice: updateInvoice
        };
    }
    async deleteInvoiceById(id, user) {
        const deleteInvoice = await this.invoiceModel.findByIdAndDelete({ id, 'createdBy.email': user.email }).exec();
        if (!deleteInvoice) {
            throw new common_1.BadRequestException('Invoice not found');
        }
        await this.cacheManager.del(`invoice:${id}`);
        await this.cacheManager.del(`invoice:${user.email}`);
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
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map