"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceModule = void 0;
const common_1 = require("@nestjs/common");
const invoice_controller_1 = require("./invoice.controller");
const invoice_service_1 = require("./invoice.service");
const invoice_schema_1 = require("./schemas/invoice.schema");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const cache_manager_1 = require("@nestjs/cache-manager");
const redisStore = require("cache-manager-ioredis");
let InvoiceModule = class InvoiceModule {
};
exports.InvoiceModule = InvoiceModule;
exports.InvoiceModule = InvoiceModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Invoice', schema: invoice_schema_1.InvoiceSchema }]),
            jwt_1.JwtModule.register({
                secret: 'JWT_SECRET',
                signOptions: { expiresIn: '1h' },
            }),
            cache_manager_1.CacheModule.register({
                store: redisStore,
                host: 'localhost',
                port: 6379,
                ttl: 600,
            }),
        ],
        controllers: [invoice_controller_1.InvoiceController],
        providers: [invoice_service_1.InvoiceService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }]
    })
], InvoiceModule);
//# sourceMappingURL=invoice.module.js.map