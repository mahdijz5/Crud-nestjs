import { Controller,Get,Post,Body,Res,Next } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/model/user.schema';
import { EditUserDto } from 'src/users/dto';
import { AuthService, UserService } from 'src/users/services';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,private authService: AuthService,@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    @Get()
    async getUser(@Body() body : {id :string},@Res() res : Response,@Next() next)   {
        try {
            const user =await this.userService.getUser(body.id)
            res.status(200).json({user})
        } catch (error) {
            return next(error)
        }
    }

    @Post("edit")
    async editUser(@Body() body : EditUserDto,@Res() res : Response,@Next() next)   {
        try {
            const decodeToken = this.authService.verifyToken(body.token,body.username)
            if(!decodeToken) {
                res.status(403).json({"message" : "get fuck out of here biiitch"})
            }
            const user =await this.userService.editUser(body)
            res.status(201).json({"newUser" : user})
        } catch (error) {
            return next(error)
        }
    }
}
