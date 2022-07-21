import { Request, Response } from 'miragejs';
import { User } from '../../../Interfaces/user.interface';
import { handleErrors } from '../server';
// import { randomBytes } from 'crypto';

function randomBytes(num: number){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for(let i = 0; i < num; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        
   return text;     
}

// console.log(randomBytes(8));
// console.log(randomBytes(8));
// console.log(randomBytes(8));
const generateToken = () => randomBytes(8);

export interface AuthResponse {
    token: string;
    user: User;
}

const login = (schema: any, req: Request): AuthResponse | Response => {
    const { username, password } = JSON.parse(req.requestBody);
    const user = schema.users.findBy({ username });

    if(!user) {
        return handleErrors(null , "No user exists with that username");
    }

    if(password !== user.password){
        return handleErrors(null, "Incorrect Password");
    }

    const token = generateToken();

    return {
        user: user.attrs as User,
        token,
    }
}


const signup = (schema: any, req: Request): AuthResponse | Response => {
    const data = JSON.parse(req.requestBody);
    const exUser = schema.users.findBy({ username: data.username });

    if(exUser){
        return handleErrors(null, 'A user with that username already exists');
    }

    const user = schema.users.create(data);
    const token = generateToken();

    return {
        user: user.attrs as User,
        token,
    }
}

export default {
    login,
    signup,
}