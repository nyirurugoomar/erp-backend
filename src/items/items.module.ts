import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemSchema } from './schemas/item.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';


@Module({
  imports:[MongooseModule.forFeature([{name:'Item',schema:ItemSchema}]),
  JwtModule.register({
    secret: 'JWT_SECRET', 
    signOptions: { expiresIn: '1h' }, 
  }),
  CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: 6379, // Ensure Redis is running on this port
    ttl: 600, // Cache expiration in seconds (10 minutes)
  }),
],
  providers: [ItemsService,
  {
  provide: APP_GUARD,useClass:ThrottlerGuard}],
  controllers:[ItemsController]
})
export class ItemsModule {}
