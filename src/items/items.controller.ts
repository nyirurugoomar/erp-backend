import { Body, Controller, Get,Post, Param, Delete, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
    constructor(
        private itemService:ItemsService
    ){}

    @Get()
    async getAllItem():Promise<Item[]>{
        return await this.itemService.getAllItems()
    }

    @Post()
    async createItem(
        @Body()
        createItem:CreateItemDto
    ):Promise<{message:string,item:Item}>{
        return await this.itemService.createItem(createItem)
    }

    @Get(':id')
    async getItem(
        @Param('id')
        id:string
    ): Promise<Item>{
        return await this.itemService.getItemById(id)
    }

    @Put(':id')
    async updateItem(
        @Param('id')
        id:string,
        @Body()
        item:Item
    ):Promise<{message:string;item:Item}>{
        return this.itemService.updateItemById(id,item)

    }

    @Delete(':id')
    async deleteItem(
        @Param('id')
        id:string,
    ): Promise<any>{
        return await this.itemService.deleteItemById(id)
    }
}
