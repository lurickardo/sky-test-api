import jwt from 'jsonwebtoken';

export class Token {
    static async genToken(payload: object ): Promise<string> {
        return jwt.sign(payload, process.env.TOKEN_KEY, {
            expiresIn: process.env.TOKEN_EXPIRATE_TIME,
        });
    }

    static async decodeToken(token: string): Promise<any> {
        return jwt.verify(token, process.env.TOKEN_KEY)
    }
}