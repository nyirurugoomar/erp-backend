import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name:'Customer',schema:CustomerSchema}]),

  JwtModule.register({
    secret: 'JWT_SECRET', 
    signOptions: { expiresIn: '1h' }, 
  }),
],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
