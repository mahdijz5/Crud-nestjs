import {  IsNotEmpty } from 'class-validator';

export class LoginDto {
    
    @IsNotEmpty({
        message : "Enter your name"
    })
    username  : string;

    @IsNotEmpty()
    password: string;
}