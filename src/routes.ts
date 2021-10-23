import { Router, Request, Response } from 'express';
import userRoutes from './user/user.routes';

const routes = Router();

routes.use('/api/', userRoutes);
routes.use((_: Request, response: Response) => {
    response.send(404).json({
        mensagem: "Rota não encontrada"
    });
});

export default routes;