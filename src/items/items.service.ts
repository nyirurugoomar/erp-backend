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

    async getAllItems(): Promise<Item[]>{
        return await this.itemModel.find().exec();
    }

    async createItem(item:CreateItemDto): Promise<{message:string; item:Item}>{
        const createItem = await this.itemModel.create(item)

        return{
            message:'Item created successfully',
            item:createItem
        }
    }

    // get item by ID
    async getItemById(id: string): Promise<Item>{
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format.');
        }
        const item = await this.itemModel
        .findById(id)
        .exec()

        if(!item){
            throw new NotFoundException('Item not found')
        }
        return item;
    }

    // update item
    async updateItemById(id:string,item:Item):Promise<{message:string;item:Item}>{
        const updateItem = await this.itemModel.findByIdAndUpdate(id,item,{
            new: true,
            runValidators: true,
        })

        if(!updateItem){
            throw new NotFoundException('Item not found')
        }

        return{
            message:'Item updated successfully',
            item:updateItem
        }
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
