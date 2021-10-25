import jwt from 'jsonwebtoken';
import { HttpStatusException } from '../config/error/HttpStatusException';

export class Token {
  static async genToken(payload: object): Promise<string> {
    return jwt.sign(payload, process.env.TOKEN_KEY, {
      expiresIn: process.env.TOKEN_EXPIRATE_TIME,
    });
  }

  static async decodeToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, process.env.TOKEN_KEY);
    } catch (error) {
      if (error.constructor.name === 'TokenExpiredError') {
        throw new HttpStatusException('Sessão inválida.', 401);
      }
      throw new HttpStatusException('Não autorizado.', 401);
    }
  }
}
