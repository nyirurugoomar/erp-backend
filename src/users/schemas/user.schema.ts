import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    USER = 'user',
  }

@Schema({ timestamps: true })
export class User {
  
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' }) // Roles: 'admin', 'user', manager.
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
