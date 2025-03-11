import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceSchema } from './schemas/invoice.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
@Module({
    imports:[MongooseModule.forFeature([{name:'Invoice',schema:InvoiceSchema}]),
    JwtModule.register({
        secret: 'JWT_SECRET', 
        signOptions: { expiresIn: '1h' }, 
      }),
],
    controllers:[InvoiceController],
    providers:[InvoiceService,
        {
        provide: APP_GUARD,
        useClass: ThrottlerGuard

    }]
})
export class InvoiceModule {}
