import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { HttpStatusException } from '../config/error/HttpStatusException';
import { Validator } from '../helpers/validator';
import { UserDto } from './dto/user.dto';
import { UserForm, SessionForm } from './form';
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
      const { _id } = request.params;

      const optionalUser = await userService.findOne(_id);

      if (!optionalUser) {
        throw new HttpStatusException('Usuário não encontrado.', 401);
      }
      return response.status(200).json(new UserDto(optionalUser));
    } catch (error) {
      return response.status(error.status).json(error.message);
    }
  }

  public async sessionCreate(request: Request, response: Response): Promise<Response> {
    try {
      const sessionForm: SessionForm = new SessionForm(request.body);

      const validate = await Validator.validate(sessionForm);

      if (validate) {
        throw new HttpStatusException(validate, 400);
      }

      const optionalUser: User = await userService.findByEmail(sessionForm.email);

      if (!optionalUser) {
        throw new HttpStatusException('Usuário e/ou senha inválidos.', 401);
      }

      if (!(await bcrypt.compare(sessionForm.senha, optionalUser.senha))) {
        throw new HttpStatusException('Usuário e/ou senha inválidos.', 401);
      }

      const user = await userService.updateLastSignIn(optionalUser);

      return response.status(200).json(
        new UserDto(user),
      );
    } catch (error) {
      return response.status(error.status).json(error.message);
    }
  }
}
