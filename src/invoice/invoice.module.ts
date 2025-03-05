import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceSchema } from './schemas/invoice.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports:[MongooseModule.forFeature([{name:'Invoice',schema:InvoiceSchema}])],
    controllers:[InvoiceController],
    providers:[InvoiceService]
})
export class InvoiceModule {}
