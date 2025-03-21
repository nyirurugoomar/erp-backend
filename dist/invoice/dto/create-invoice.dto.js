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
exports.CreateInvoiceDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class InvoiceItemDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the item' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InvoiceItemDto.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the item' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InvoiceItemDto.prototype, "itemTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Detailed description of the item' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InvoiceItemDto.prototype, "itemDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price of the item' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], InvoiceItemDto.prototype, "itemPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current quantity of the item' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], InvoiceItemDto.prototype, "currentQty", void 0);
class CreateInvoiceDto {
}
exports.CreateInvoiceDto = CreateInvoiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Invoice Date'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "invoiceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer Name'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer Email'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "customerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer Address'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "customerAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer Phone'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "customerPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of items in the invoice',
        type: [InvoiceItemDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InvoiceItemDto),
    __metadata("design:type", Array)
], CreateInvoiceDto.prototype, "items", void 0);
//# sourceMappingURL=create-invoice.dto.js.map