import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { mongoMiddelware, mongoConnection } from './configs/db';

@Module({
    imports: [mongoConnection,  mongoMiddelware, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule { }
