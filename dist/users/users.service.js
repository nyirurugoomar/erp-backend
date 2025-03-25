"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userModel, jwtService, cacheManager) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.cacheManager = cacheManager;
    }
    generateToken(user) {
        return this.jwtService.sign({ email: user.email, name: user.name }, { secret: process.env.JWT_SECRET });
    }
    async createUser(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = new this.userModel({ ...dto, password: hashedPassword });
        const savedUser = await user.save();
        await this.cacheManager.set(`user:${savedUser._id}`, savedUser);
        const token = this.generateToken(savedUser);
        return { message: 'User registered successfully', token, user: savedUser };
    }
    async findUserByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findUserById(id) {
        const cachedUser = await this.cacheManager.get(`user:${id}`);
        if (cachedUser)
            return cachedUser;
        const user = await this.userModel.findById(id).exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.cacheManager.set(`user:${id}`, user);
        return user;
    }
    async validateUserCredentials(dto) {
        const user = await this.findUserByEmail(dto.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const token = this.generateToken(user);
        await this.cacheManager.set(`session:${user.id}`, token);
        return { message: 'Login successfully', token, user };
    }
    async deleteUser(id) {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException('User not found');
        await this.cacheManager.del(`user:${id}`);
        return { message: 'User deleted successfully' };
    }
    async logoutUser(id) {
        await this.cacheManager.del(`session:${id}`);
        return { message: 'Logged out successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, common_1.Inject)('CACHE_MANAGER')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map