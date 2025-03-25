import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('ERP Backend API Documentation')
    .setDescription('ERP for small business. Key Features: -Item -Invoice -Customers ')
    .setVersion('1.0')
    .addBearerAuth()
    
    .build();
  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT || 3004; 
  app.enableCors();
  app.use(helmet());
  
  await app.listen(PORT)
  console.log(`Application is running on port ${PORT}`);
}
bootstrap();
