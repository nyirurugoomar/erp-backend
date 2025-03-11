import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceSchema } from './schemas/invoice.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[MongooseModule.forFeature([{name:'Invoice',schema:InvoiceSchema}]),
    JwtModule.register({
        secret: 'JWT_SECRET', 
        signOptions: { expiresIn: '1h' }, 
      }),
],
    controllers:[InvoiceController],
    providers:[InvoiceService]
})
export class InvoiceModule {}
