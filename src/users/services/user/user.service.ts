import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/model/user.schema';
import { EditUserDto } from 'src/users/dto';
import { UserInterface } from 'src/users/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getUser(id : string) : Promise<Object> {
        try {
            const user =await this.userModel.findOne({_id : id})
            if(!user) {
                const error :any = new Error()
                error.message = "user doesnt Exist"
                error.statusCode = 404
                throw error;
            }
            return user;
        } catch (error) {
            throw error
        }
    }

    async editUser( data:EditUserDto): Promise<Object> {
        try {
            const user =await this.userModel.findOne({_id : data.id})
            if(!user) {
                const error :any = new Error()
                error.message = "user doesnt Exist"
                error.statusCode = 404
                throw error;
            }

            user.username = data.username
            user.email = data.email

            await user.save();
            return  user
        } catch (error) {
            throw error 
        }
    }
}
