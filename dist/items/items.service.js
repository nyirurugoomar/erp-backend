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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const item_schema_1 = require("./schemas/item.schema");
let ItemsService = class ItemsService {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }
    async getAllItems(user, search, page = 1, limit = 10) {
        const filter = { 'createdBy.email': user.email };
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }
        const total = await this.itemModel.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const items = await this.itemModel
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        return { items, total, page, totalPages };
    }
    async createItem(item, user) {
        const createItem = await this.itemModel.create({ ...item, createdBy: user });
        return {
            message: 'Item created successfully',
            item: createItem
        };
    }
    async getItemById(id, user) {
        const item = await this.itemModel.findOne({ _id: id, 'createdBy.email': user.email }).exec();
        if (!item) {
            throw new common_1.NotFoundException('Item not found');
        }
        return item;
    }
    async updateItemById(id, item, user) {
        const updatedItem = await this.itemModel.findOneAndUpdate({ _id: id, 'createdBy.email': user.email }, item, { new: true, runValidators: true });
        if (!updatedItem) {
            throw new common_1.NotFoundException('Item not found or not authorized');
        }
        return { message: 'Item updated successfully', item: updatedItem };
    }
    async deleteItemById(id) {
        const deleteItem = await this.itemModel.findByIdAndDelete(id);
        if (!deleteItem) {
            throw new common_1.NotFoundException('Item not found');
        }
        return {
            message: 'Item delete successfully',
            item: deleteItem
        };
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(item_schema_1.Item.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ItemsService);
//# sourceMappingURL=items.service.js.map