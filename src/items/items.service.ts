import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectModel(Item.name)
        private itemModel:Model<Item>
    ){}

    async getAllItems(user: { email: string,name:string }): Promise<Item[]> {
        return await this.itemModel.find({ 'createdBy.email': user.email }).exec();
    }

    async createItem(item:CreateItemDto,user: { name: string; email: string }): Promise<{message:string; item:Item}>{
        const createItem = await this.itemModel.create({ ...item, createdBy: user })

        return{
            message:'Item created successfully',
            item:createItem
        }
    }

    // get item by ID
    async getItemById(id: string, user: { email: string }): Promise<Item> {
        const item = await this.itemModel.findOne({ _id: id, 'createdBy.email': user.email }).exec();
        
        if (!item) {
            throw new NotFoundException('Item not found or not authorized');
        }
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
    
        return { message: 'Item updated successfully', item: updatedItem };
    }

    async deleteItemById(id:string):Promise<any>{
        const deleteItem = await this.itemModel.findByIdAndDelete(id);

        if(!deleteItem){
            throw new NotFoundException('Item not found')
        }
        return{
            message:'Item delete successfully',
            item:deleteItem
        }
    }
}
