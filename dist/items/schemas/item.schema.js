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
exports.ItemSchema = exports.Item = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Item = class Item {
};
exports.Item = Item;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Item Title'
    }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Item.prototype, "itemTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Item Description'
    }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Item.prototype, "itemDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Item Initial Quantity'
    }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], Item.prototype, "initialQty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Item Current Quantity'
    }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], Item.prototype, "CurentQty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Item Price'
    }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], Item.prototype, "itemPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Item Image'
    }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Item.prototype, "itemImage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Object }),
    __metadata("design:type", Object)
], Item.prototype, "createdBy", void 0);
exports.Item = Item = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Item);
exports.ItemSchema = mongoose_1.SchemaFactory.createForClass(Item);
//# sourceMappingURL=item.schema.js.map