import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemSchema } from './schemas/item.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:'Item',schema:ItemSchema}])],
  providers: [ItemsService],
  controllers:[ItemsController]
})
export class ItemsModule {}
