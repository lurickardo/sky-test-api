import { Request, Response } from 'express';
import { Token } from '../helpers/token';
import User from '../database/models/User';
import { TokenExpiredError } from 'jsonwebtoken';

export class UserMiddleware {
    async auth(request: Request, response: Response, next) {
      try {
        const auth = request.headers.authorization;
          
          if (!auth)
            return response.status(401).json({ mensagem: 'Não autorizado.' });
          
          const [bearer, token] = auth.split(' ');
          
          if (bearer != 'Bearer' || !token) 
            return response.status(401).json({ mensagem: 'Não autorizado.' });
    
          const payload = await Token.decodeToken(token);

          const _id: string = request.params._id;
          const optionalUser = await User.findOne({ _id }).exec();
          
          if(!optionalUser)
            return response.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });

          if(payload.id != optionalUser._id)
            return response.status(404).json({
              mensagem: 'Não autorizado.'
            });
    
          return next();
      } catch (error) {
        if(error.constructor.name === 'TokenExpiredError')
          return response.status(404).json({
            mensagem: 'Sessão inválida.'
          });
        return response.status(error.status).json(error.message);
      }
    }
}