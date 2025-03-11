import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<{
        message: string;
        token: string;
        user: User;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        message: string;
        token: string;
        user: User;
    }>;
}
