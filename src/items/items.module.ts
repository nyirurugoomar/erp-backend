import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemSchema } from './schemas/item.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name:'Item',schema:ItemSchema}]),
  JwtModule.register({
    secret: 'JWT_SECRET', 
    signOptions: { expiresIn: '1h' }, 
  }),
],
  providers: [ItemsService],
  controllers:[ItemsController]
})
export class ItemsModule {}
