import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema}]),
  JwtModule.register({
    secret: 'JWT_SECRET', 
    signOptions: { expiresIn: '1h' },
  }),
],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
