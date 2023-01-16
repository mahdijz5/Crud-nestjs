import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';
import { AuthService } from './services/auth-service/auth-service';

@Module({
  controllers: [AuthController, UserController],
  providers: [ AuthService]
})
export class UsersModule { }
