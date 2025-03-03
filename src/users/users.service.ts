import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    // Create a new user
    async createUser(dto: CreateUserDto): Promise<{ message: string; user: User }> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = new this.userModel({ ...dto, password: hashedPassword });
        const savedUser = await user.save()
        return { message: 'User registered successfully', user: savedUser };

    }

    // Find a user by email
    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    // Find a user by ID
    async findUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    // Validate user login
    async validateUserCredentials(dto: LoginUserDto): Promise<{ message: string; user: User }> {
        const user = await this.findUserByEmail(dto.email);
        if (!user) throw new NotFoundException('User not found');

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        return {message:'Login successfully',user}
    }

    // Delete a user by ID
    async deleteUser(id: string): Promise<{ message: string }> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('User not found');
        return { message: 'User deleted successfully' };
    }
}
