import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/model/user.schema';
import { CreateUserDto, LoginDto } from 'src/users/dto';
import { compare } from 'bcryptjs';
import { sign,verify } from "jsonwebtoken"

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(body: CreateUserDto): Promise<Object> {
        try {
            const { username, email, password } = body
            const user = await this.userModel.findOne({ username })
            if (user) {
                const err: any = new Error()
                err.status = 400
                err.message = "this user exists"
                throw err;
            }

            await this.userModel.create({
                username,
                email,
                password,
            })
            return { "message": "User Successfully created" }
        } catch (error) {
            throw error
        }
    }

    generateToken(payload:object,min : number) :String {
        return sign({ ...payload }, 'SECRET',{ expiresIn: 60 * min })
    }

    verifyToken(token : string,username? : string):{email :string,username : string} {
        return verify(token,'SECRET',(err : Error,decodeToken) => {
            if(err) return false
            console.log(decodeToken)
            if(username) {
                if(decodeToken.username !== username) {
                    return false
                }
            }
            return {user : decodeToken}
        }) 
    }

}
