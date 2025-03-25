import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { Cache } from 'cache-manager';
export declare class ItemsService {
    private itemModel;
    private cacheManager;
    constructor(itemModel: Model<Item>, cacheManager: Cache);
    getAllItems(user: {
        email: string;
        name: string;
    }, search?: string, page?: number, limit?: number): Promise<{
        items: Item[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    createItem(item: CreateItemDto, user: {
        name: string;
        email: string;
    }): Promise<{
        message: string;
        item: Item;
    }>;
    getItemById(id: string, user: {
        email: string;
    }): Promise<Item>;
    updateItemById(id: string, item: Item, user: {
        email: string;
    }): Promise<{
        message: string;
        item: Item;
    }>;
    deleteItemById(id: string): Promise<any>;
}
