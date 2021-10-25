import { Request, Response } from 'express';
import { HttpStatusException } from '../config/error/HttpStatusException';
import { Token } from '../helpers/token';
import User from '../database/models/User';

export class UserMiddleware {
  async auth(request: Request, response: Response, next) {
    try {
      const auth = request.headers.authorization;

      if (!auth) { throw new HttpStatusException('Não autorizado.', 401); }

      const [bearer, token] = auth.split(' ');

      if (bearer !== 'Bearer' || !token) { throw new HttpStatusException('Não autorizado.', 401); }

      const { id: idToken } = await Token.decodeToken(token);

      const { _id } = request.params;

      if (idToken !== _id) { throw new HttpStatusException('Não autorizado.', 401); }

      const optionalUser = await User.findOne({ _id }).exec();

      if (!optionalUser) {
        throw new HttpStatusException('Usuário não encontrado.', 404);
      }

      if (token !== optionalUser.token) {
        throw new HttpStatusException('Não autorizado.', 401);
      }

      return next();
    } catch (error) {
      return response.status(error.status).json(error.message);
    }
  }
}
