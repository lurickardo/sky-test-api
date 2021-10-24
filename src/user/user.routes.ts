import {Router} from 'express';
import {UserController} from './user.controller';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/users', userController.create)
userRoutes.get('/users/:_id', userController.find)

export default userRoutes