import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.PORT || 3004; 
  await app.listen(PORT)
  console.log(`Application is running on port ${PORT}`);
}
bootstrap();
