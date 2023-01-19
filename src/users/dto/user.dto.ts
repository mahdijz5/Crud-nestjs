import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    
    @IsNotEmpty({
        message : "Enter your name"
    })
    username  : string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}