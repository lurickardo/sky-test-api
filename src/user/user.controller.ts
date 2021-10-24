import { Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { UserForm } from './form/user.form';
import { UserService } from './user.service';

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
}