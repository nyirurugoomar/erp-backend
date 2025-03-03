import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
export declare class ItemsService {
    private itemModel;
    constructor(itemModel: Model<Item>);
    getAllItems(): Promise<Item[]>;
    createItem(item: CreateItemDto): Promise<{
        message: string;
        item: Item;
    }>;
    getItemById(id: string): Promise<Item>;
    updateItemById(id: string, item: Item): Promise<{
        message: string;
        item: Item;
    }>;
    deleteItemById(id: string): Promise<any>;
}
