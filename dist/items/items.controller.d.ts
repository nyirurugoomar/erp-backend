import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
export declare class ItemsController {
    private itemService;
    constructor(itemService: ItemsService);
    getAllItems(req: Request & {
        user?: {
            email: string;
            name: string;
        };
    }, search?: string, page?: string, limit?: string): Promise<{
        items: Item[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    createItem(createItem: CreateItemDto, req: any): Promise<{
        message: string;
        item: Item;
    }>;
    getItem(id: string, req: any): Promise<Item>;
    updateItem(id: string, item: Item, req: any): Promise<{
        message: string;
        item: Item;
    }>;
    deleteItem(id: string, req: any): Promise<any>;
}
