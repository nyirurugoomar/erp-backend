import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
@Module({
  imports:[MongooseModule.forFeature([{name:'Customer',schema:CustomerSchema}]),

  JwtModule.register({
    secret: 'JWT_SECRET', 
    signOptions: { expiresIn: '1h' }, 
  }),
],
  providers: [CustomerService,
    {provide: APP_GUARD,
      useClass: ThrottlerGuard}],
  controllers: [CustomerController]
})
export class CustomerModule {}
