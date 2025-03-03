import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Create a new user
    @Post('register')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string; user: User }> {
        return this.usersService.createUser(createUserDto);
    }

    // Get user by ID
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return this.usersService.findUserById(id);
    }

    // Validate login
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<{ message: string; user: User }> {
        return this.usersService.validateUserCredentials(loginUserDto);
    }

    // Delete user by ID
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
        return this.usersService.deleteUser(id);
    }
}
