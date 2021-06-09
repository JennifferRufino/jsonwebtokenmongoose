import {Router} from 'express';

import AuthMidleware from '../middleware/AuthMidleware';
import UserController from '../controllers/UserController';
import LoginController from '../controllers/LoginController';

const routes = Router();

const user = new UserController();
const login = new LoginController();
const auth = new AuthMidleware();

routes.get('/user', user.show);
routes.post('/user', auth.midd, user.store);
routes.post('/login', login.index);

export {routes};