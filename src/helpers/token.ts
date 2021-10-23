import jwt from 'jsonwebtoken';
import {Crypt} from './crypt'

export class Token {
    static async genToken(value: string ): Promise<string>{
        const jwtToken = jwt.sign({ value }, process.env.TOKEN_KEY, {
            expiresIn: process.env.TOKEN_EXPIRATE_TIME,
        });
    
        return Crypt.genHash(jwtToken);
    }
}