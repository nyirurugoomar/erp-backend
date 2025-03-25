import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({

  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 5000,
          limit: 4,
        },
      ],
    }),
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
     }),
     CacheModule.register({
      store: redisStore as unknown as CacheStorage,
      host: 'localhost', 
      port: 6379,        
      ttl: 600,          
    }),
     
     MongooseModule.forRoot(process.env.DB_URI),
    
    UsersModule,
    ItemsModule,
    InvoiceModule,
    CustomerModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
