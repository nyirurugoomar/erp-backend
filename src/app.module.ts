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
     MongooseModule.forRoot(process.env.DB_URI),
    
    UsersModule,
    ItemsModule,
    InvoiceModule,
    CustomerModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
