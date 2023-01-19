import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/model/user.schema";
import {hash} from "bcryptjs" 

export const mongoConnection = MongooseModule.forRoot('mongodb://localhost:27017/crud-nest')

export const mongoMiddelware = MongooseModule.forFeatureAsync([
    {
        name: User.name,
        useFactory: () => {
            const schema = UserSchema;
            schema.pre('save', function (next) {
                let user = this
	
                if(!user.isModified('password')) return next()
                

                hash(user.password,10, (err : Error,hash : string) => {
                    if(err) return next(err);
            
                    user.password = hash
            
                    next()
                })
            });
            return schema;
        },
    },
])