import {  Injectable, NotFoundException,Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class ItemsService {
    constructor(
        @InjectModel(Item.name)
        private itemModel:Model<Item>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}

    async getAllItems(
        user: { email: string; name: string },
        search?: string,
        page: number = 1,
        limit: number = 10
    ): Promise<{ items: Item[]; total: number; page: number; totalPages: number }> {
        const cacheKey = `items:${user.email}:${search || ''}:${page}:${limit}`;
        const cachedItems = await this.cacheManager.get(cacheKey);

    if (cachedItems) {
      return cachedItems as any;
    }
        const filter: any = { 'createdBy.email': user.email };
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

            const response = { items, total, page, totalPages };
    
            // Store in cache for 10 minutes
            await this.cacheManager.set(cacheKey, response);
        
            return response;
    }

    async createItem(item:CreateItemDto,user: { name: string; email: string }): Promise<{message:string; item:Item}>{
        const createItem = await this.itemModel.create({ ...item, createdBy: user })
        await this.cacheManager.del(`items:${user.email}`);
        return{
            message:'Item created successfully',
            item:createItem
        }
    }

    // get item by ID
    async getItemById(id: string, user: { email: string }): Promise<Item> {
        const cacheKey = `item:${id}`;
        const cachedItem = await this.cacheManager.get(cacheKey);

    if (cachedItem) {
      return cachedItem as Item;
    }

        const item = await this.itemModel.findOne({ _id: id, 'createdBy.email': user.email }).exec();
        
        if (!item) {
            throw new NotFoundException('Item not found');
        }
        await this.cacheManager.set(cacheKey, item);

    return item;
    }

    // update item
    async updateItemById(id: string, item: Item, user: { email: string }): Promise<{ message: string; item: Item }> {
        const updatedItem = await this.itemModel.findOneAndUpdate(
            { _id: id, 'createdBy.email': user.email }, 
            item, 
            { new: true, runValidators: true }
        );
    
        if (!updatedItem) {
            throw new NotFoundException('Item not found or not authorized');
        }
        await this.cacheManager.del(`item:${id}`);
        await this.cacheManager.del(`items:${user.email}`);
    
        return { message: 'Item updated successfully', item: updatedItem };
    }

    async deleteItemById(id:string):Promise<any>{
        const deleteItem = await this.itemModel.findByIdAndDelete(id);

        if(!deleteItem){
            throw new NotFoundException('Item not found')
        }
        await this.cacheManager.del(`item:${id}`);
        await this.cacheManager.del(`items:${deleteItem.createdBy.email}`);    
        return{
            message:'Item delete successfully',
            item:deleteItem
        }
    }
}
