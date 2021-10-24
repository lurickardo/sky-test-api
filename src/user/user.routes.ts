import {Router} from 'express';
import {UserController} from './user.controller';
import {UserMiddleware} from './user.middleware';

const userRoutes = Router();
const userMiddleware = new UserMiddleware()
const userController = new UserController();

userRoutes.post('/users', userController.create)
userRoutes.patch('/users', userController.sessionCreate)
userRoutes.get('/users/:_id', userMiddleware.auth, userController.find)

export default userRoutes