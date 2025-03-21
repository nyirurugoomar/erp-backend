import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    private generateToken;
    createUser(dto: CreateUserDto): Promise<{
        message: string;
        token: string;
        user: User;
    }>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(id: string): Promise<User>;
    validateUserCredentials(dto: LoginUserDto): Promise<{
        message: string;
        token: string;
        user: User;
    }>;
}
