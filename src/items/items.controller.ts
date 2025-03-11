import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Query
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { AuthGuard } from '../users/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  
  @UseGuards(AuthGuard)
  async getAllItems(
    @Req() req: Request & { user?: { email: string; name: string } }, // Ensure user is defined
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    if (!req.user) {
      throw new Error('User not found in request'); // Debugging step
    }
    return this.itemService.getAllItems(req.user, search, Number(page), Number(limit));
  }

  @UseGuards(AuthGuard)
  @Post()
  async createItem(
    @Body()
    createItem: CreateItemDto,
    @Req() req,
  ): Promise<{ message: string; item: Item }> {
    return await this.itemService.createItem(createItem, req.user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getItem(@Param('id') id: string, @Req() req): Promise<Item> {
    return await this.itemService.getItemById(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() item: Item,
    @Req() req,
  ): Promise<{ message: string; item: Item }> {
    return this.itemService.updateItemById(id, item, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteItem(
    @Param('id')
    id: string,
  ): Promise<any> {
    return await this.itemService.deleteItemById(id);
  }
}
