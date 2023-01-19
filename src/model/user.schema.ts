import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required :true,type : String,trim:true})
    username: string;

    @Prop({required :true,type : String,trim:true})
    email: string

    @Prop({required :true,type : String,trim:true})
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);