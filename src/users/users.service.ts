import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        @Inject('CACHE_MANAGER') private cacheManager: Cache,
    ) {}

    private generateToken(user: User): string {
        return this.jwtService.sign({ email: user.email,name:user.name }, { secret: process.env.JWT_SECRET });    }

    // Create a new user
    async createUser(dto: CreateUserDto): Promise<{ message: string; token: string; user: User }> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = new this.userModel({ ...dto, password: hashedPassword });
        const savedUser = await user.save();
        // Cache user data
        await this.cacheManager.set(`user:${savedUser._id}`, savedUser,);
        const token = this.generateToken(savedUser);
        return { message: 'User registered successfully', token, user: savedUser };
    }

    // Find a user by email
    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    // Find a user by ID
    async findUserById(id: string): Promise<User> {
        // Try to get user from cache
    const cachedUser = await this.cacheManager.get<User>(`user:${id}`);
    if (cachedUser) return cachedUser;
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('User not found');
        await this.cacheManager.set(`user:${id}`, user,);
        return user;
    }

    // Validate user login
    async validateUserCredentials(dto: LoginUserDto): Promise<{ message: string; token: string; user: User }> {
        const user = await this.findUserByEmail(dto.email);
        if (!user) throw new NotFoundException('User not found');

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        const token = this.generateToken(user);
        await this.cacheManager.set(`session:${user.id}`, token);
        return { message: 'Login successfully', token, user };
    }

    // Delete a user and remove from cache
  async deleteUser(id: string): Promise<{ message: string }> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('User not found');

    // Remove from Redis cache
    await this.cacheManager.del(`user:${id}`);

    return { message: 'User deleted successfully' };
  }

  // Logout user and remove session from Redis
  async logoutUser(id: string): Promise<{ message: string }> {
    await this.cacheManager.del(`session:${id}`);
    return { message: 'Logged out successfully' };
  }
}
