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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSchema = exports.Invoice = exports.InvoiceItemSchema = exports.InvoiceItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let InvoiceItem = class InvoiceItem {
};
exports.InvoiceItem = InvoiceItem;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the item' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InvoiceItem.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the item' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InvoiceItem.prototype, "itemTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Detailed description of the item' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InvoiceItem.prototype, "itemDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price of the item' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "itemPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current quantity of the item' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "currentQty", void 0);
exports.InvoiceItem = InvoiceItem = __decorate([
    (0, mongoose_1.Schema)()
], InvoiceItem);
exports.InvoiceItemSchema = mongoose_1.SchemaFactory.createForClass(InvoiceItem);
let Invoice = class Invoice {
};
exports.Invoice = Invoice;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Invoice Date' }),
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], Invoice.prototype, "invoiceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer Name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Invoice.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer Email' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Invoice.prototype, "customerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer Address' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Invoice.prototype, "customerAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer Phone' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Invoice.prototype, "customerPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of items in the invoice', type: [InvoiceItem] }),
    (0, mongoose_1.Prop)({ type: [exports.InvoiceItemSchema], required: true }),
    __metadata("design:type", Array)
], Invoice.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User who created the invoice' }),
    (0, mongoose_1.Prop)({ required: true, type: Object }),
    __metadata("design:type", Object)
], Invoice.prototype, "createdBy", void 0);
exports.Invoice = Invoice = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Invoice);
exports.InvoiceSchema = mongoose_1.SchemaFactory.createForClass(Invoice);
//# sourceMappingURL=invoice.schema.js.map