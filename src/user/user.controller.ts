import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Validator } from './../helpers/validator';
import { UserDto } from './dto/user.dto';
import { UserForm, SessionForm } from './form';
import { UserService } from './user.service';
import { Token } from '../helpers/token';

const userService = new UserService();

export class UserController {
    
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const userForm: UserForm = new UserForm(request.body);
            return response.status(201).json(await userService.create(userForm));
        } catch (error) {
            return response.status(error.status).json(error.message);
        }
    }

    public async find(request: Request, response: Response): Promise<Response> {
        try {
            const _id: string = request.params._id;

            const optionalUser = await userService.findOne(_id)

            if(!optionalUser)
                return response.status(404).json({
                    message: 'Usuário não encontrado.'
                });
            return response.status(200).json(new UserDto(optionalUser));
        } catch (error) {
            return response.status(error.status).json(error.message);
        }
    }

    public async sessionCreate(request: Request, response: Response): Promise<Response> {
        try {
            const sessionForm: SessionForm = new SessionForm(request.body);

            await Validator.validate(sessionForm)

            const optionalUser: User = await userService.findByEmail(sessionForm.email)
            
            if(!optionalUser)
                return response.status(404).json({
                    message: 'Usuário e/ou senha inválidos.'
                });
                
            if (!(await bcrypt.compare(sessionForm.senha, optionalUser.senha)))
                return response.status(401).json({ 
                    mensagem: 'Usuário e/ou senha inválidos.' 
                });
            
            const user = await userService.updateLastSignIn(optionalUser);
            
            return response.status(200).json(
                new UserDto(Object.assign(user, {token: await Token.genToken(user._id)}))
            );
        } catch (error) {
            return response.status(error.status).json(error.message);
        }
    }
}