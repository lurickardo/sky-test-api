import jwt, { JwtPayload } from 'jsonwebtoken';
import {Crypt} from './crypt'

export class Token {
    static async genToken(value: string ): Promise<string> {
        const token = jwt.sign({ value }, process.env.TOKEN_KEY, {
            expiresIn: process.env.TOKEN_EXPIRATE_TIME,
        });
    
        return Crypt.genHash(token);
    }

    static async decodeToken(value: string): Promise<string | JwtPayload> {
        return jwt.verify(value, process.env.TOKEN_KEY)
    }
}