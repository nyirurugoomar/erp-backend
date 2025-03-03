import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(dto: CreateUserDto): Promise<{
        message: string;
        user: User;
    }>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(id: string): Promise<User>;
    validateUserCredentials(dto: LoginUserDto): Promise<{
        message: string;
        user: User;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
