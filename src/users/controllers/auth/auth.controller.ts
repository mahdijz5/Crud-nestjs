import { Controller, Get,Res } from '@nestjs/common';
import { Response } from 'express';
import { send } from 'process';
import { AuthService } from 'src/users/services/auth-service/auth-service';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    @Get()
    findAll(@Res() res : Response) {        
        return this.authService.test()
    }
}
