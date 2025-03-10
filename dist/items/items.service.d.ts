import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
export declare class ItemsService {
    private itemModel;
    constructor(itemModel: Model<Item>);
    getAllItems(user: {
        email: string;
        name: string;
    }): Promise<Item[]>;
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
