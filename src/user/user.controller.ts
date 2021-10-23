import { Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { UserForm } from './form/user.form';
import { UserService } from './user.service';

const userService = new UserService();

export class UserController {
    
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const userForm: UserForm = new UserForm(request.body);

            const userDto: UserDto = await userService.create(userForm);

            return response.status(201).json(userDto);
        } catch (error) {
            return response.status(error.status).json(error.message);
        }
    }
}