import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
export declare class ItemsController {
    private itemService;
    constructor(itemService: ItemsService);
    getAllItems(req: any): Promise<Item[]>;
    createItem(createItem: CreateItemDto, req: any): Promise<{
        message: string;
        item: Item;
    }>;
    getItem(id: string, req: any): Promise<Item>;
    updateItem(id: string, item: Item, req: any): Promise<{
        message: string;
        item: Item;
    }>;
    deleteItem(id: string): Promise<any>;
}
