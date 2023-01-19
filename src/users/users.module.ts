import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/model/user.schema';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';
import { AuthService } from './services/auth-service/auth-service';
import { UserService } from './services/user/user.service';

@Module({
  imports : [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AuthController, UserController],
  providers: [ AuthService, UserService]
})
export class UsersModule { }
