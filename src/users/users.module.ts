import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
@Module({
  imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema}]),
  JwtModule.register({
    secret: 'JWT_SECRET', 
    signOptions: { expiresIn: '1h' },
  }),
  CacheModule.register({
    store: redisStore,
    host: 'localhost', 
    port: 6380,        
    ttl: 600,          
  }),
],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
