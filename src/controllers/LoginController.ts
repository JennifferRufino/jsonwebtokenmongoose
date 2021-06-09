import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {auth} from '../config/auth';

import {User} from '../models/User';

class LoginController {
    public async index(req: Request, res: Response){
        const {email, password} = req.body;

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).json({
              error: true,
              message: "Usuário não existe!"
            })
        }

        if(!(await bcrypt.compare(password, userExist.password))) {
            return res.status(400).json({
              error: true,
              message: "A senha está inválida!"
            })
        }

        return res.status(200).json({
            user: {
                name: userExist.name,
                email: userExist.email
            },
            token: jwt.sign(
                {id: userExist._id},
                auth.secret,
                {expiresIn: auth.expireIn}
            )
        })
      
    }
}

export default LoginController;