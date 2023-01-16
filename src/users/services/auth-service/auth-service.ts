import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    test() {
        console.log("hello")
        return "hello bitch. its fucking working"
    }
}
