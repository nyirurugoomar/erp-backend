"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ERP Backend API Documentation')
        .setDescription('ERP for small business. Key Features: -Item -Invoice -Customers ')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const PORT = process.env.PORT || 3004;
    app.enableCors();
    app.use((0, helmet_1.default)());
    await app.listen(PORT);
    console.log(`Application is running on port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map