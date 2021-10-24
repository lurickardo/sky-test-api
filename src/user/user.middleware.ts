import { Request, Response } from 'express';
import { Token } from '../helpers/token';
import User from '../database/models/User';

export class UserMiddleware {
    async auth(request: Request, response: Response, next) {
          const auth = request.headers.authorization;
          
          if (!auth)
            return response.status(401).json({ message: 'Não autorizado.' });
          
          const [bearer, token] = auth.split(' ');
          
          if (bearer != 'Bearer' || !token) 
            return response.status(401).json({ message: 'Não autorizado.' });
    
          const decoded = await Token.decodeToken(token);


          const _id: string = request.params._id;
          const optionalUser = await User.findOne({ _id }).exec();
          
          if(!optionalUser)
            return response.status(404).json({
                message: 'Usuário não encontrado.'
            });
          
          const {ultimo_login} = optionalUser;
    
    
          return next();
      }
}