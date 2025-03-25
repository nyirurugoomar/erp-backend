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
const cache_manager_1 = require("@nestjs/cache-manager");
let ItemsService = class ItemsService {
    constructor(itemModel, cacheManager) {
        this.itemModel = itemModel;
        this.cacheManager = cacheManager;
    }
    async getAllItems(user, search, page = 1, limit = 10) {
        const cacheKey = `items:${user.email}:${search || ''}:${page}:${limit}`;
        const cachedItems = await this.cacheManager.get(cacheKey);
        if (cachedItems) {
            return cachedItems;
        }
        const filter = { 'createdBy.email': user.email };
        if (search) {
            filter.$or = [
                { itemTitle: { $regex: search, $options: 'i' } },
                { itemDescription: { $regex: search, $options: 'i' } }
            ];
        }
        const total = await this.itemModel.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const items = await this.itemModel
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        const response = { items, total, page, totalPages };
        await this.cacheManager.set(cacheKey, response);
        return response;
    }
    async createItem(item, user) {
        const createItem = await this.itemModel.create({ ...item, createdBy: user });
        await this.cacheManager.del(`items:${user.email}`);
        return {
            message: 'Item created successfully',
            item: createItem
        };
    }
    async getItemById(id, user) {
        const cacheKey = `item:${id}`;
        const cachedItem = await this.cacheManager.get(cacheKey);
        if (cachedItem) {
            return cachedItem;
        }
        const item = await this.itemModel.findOne({ _id: id, 'createdBy.email': user.email }).exec();
        if (!item) {
            throw new common_1.NotFoundException('Item not found');
        }
        await this.cacheManager.set(cacheKey, item);
        return item;
    }
    async updateItemById(id, item, user) {
        const updatedItem = await this.itemModel.findOneAndUpdate({ _id: id, 'createdBy.email': user.email }, item, { new: true, runValidators: true });
        if (!updatedItem) {
            throw new common_1.NotFoundException('Item not found or not authorized');
        }
        await this.cacheManager.del(`item:${id}`);
        await this.cacheManager.del(`items:${user.email}`);
        return { message: 'Item updated successfully', item: updatedItem };
    }
    async deleteItemById(id, user) {
        const deleteItem = await this.itemModel.findOneAndDelete({ _id: id, 'createdBy.email': user.email });
        if (!deleteItem) {
            throw new common_1.NotFoundException('Item not found or not authorized');
        }
        await this.cacheManager.del(`item:${id}`);
        await this.cacheManager.del(`items:${user.email}`);
        return {
            message: 'Item deleted successfully',
            item: deleteItem
        };
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(item_schema_1.Item.name)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model, Object])
], ItemsService);
//# sourceMappingURL=items.service.js.map