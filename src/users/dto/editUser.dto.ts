import {  IsEmail, IsNotEmpty } from 'class-validator';

export class EditUserDto {
    
    token : string

    @IsNotEmpty()
    id :string

    @IsNotEmpty({
        message : "Enter your name"
    })
    username  : string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    
}