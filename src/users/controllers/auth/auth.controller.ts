import { Post, Controller, Get, Res, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/model/user.schema';
import { CreateUserDto, LoginDto } from 'src/users/dto';
import { compare } from 'bcryptjs';
import { sign,verify } from "jsonwebtoken"
import { AuthService } from 'src/users/services';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,@InjectModel(User.name) private userModel: Model<UserDocument>) { }
    

    @Post() 
    async authorization(@Body() body: {token : string}, @Res() res: Response) : Promise<Object> {
        try {
            let resultOfAuth = this.authService.verifyToken(body.token)
            if(!resultOfAuth) return res.status(403).json({"message" : "You dont have enough permision to do this!"})
            return res.status(200).json({"message" :"your permision is valid"})
        } catch (error) {
            return res.json(error)
        }
    }

    @Post("register")
    async register(@Body() body: CreateUserDto, @Res() res: Response): Promise<Object> {
        try {
            await this.authService.createUser(body)
            return res.status(200).json({ "message": "successfully created" })
        } catch (error) {
            console.log(error)
            return res.json(error)
            
        }
    }

    @Post("login")
    async login(@Body() body: LoginDto, @Res() res: Response) :Promise<Object> {
        let { username, password } = body;
        let {generateToken} = this.authService 
        try {
            const user = await this.userModel.findOne({ username })
            if (!user) {
                return res.status(400).json({"message" : "user doesnt exist"})
            }
            
            return compare(password, user.password, function (err, result) {
                if (err || !result) {
                    return res.status(400).json({"message" : "password or username is wrong"})
                }else {
                                
                    let token = generateToken({username ,email : user.email},1)
                    res.status(200).json({ "message": "you logged in",token })
                }
            });
        } catch (error) {
            return res.json(error)
        }
    }
 

}
