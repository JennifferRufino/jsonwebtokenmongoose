import jwt from 'jsonwebtoken';
import {auth} from '../config/auth';
import {promisify} from 'util';
import { NextFunction, Request, Response } from 'express';

class AuthMidleware {
    async midd (req: Request, res: Response, next: NextFunction) {
        const authe = req.headers.authorization;

        if(!authe){
            return res.status(401).json({
              error: true,
              code: 130,
              message: "O token de autenticação não existe!"
            })
        }
        
        const [, token] = authe.split(' ');

        try {
            const decoded = await promisify(jwt.verify)(token, auth.secret);

            if(!decoded) {
                return res.status(401).json({
                    error: true,
                    code: 130,
                    message: "O token está expirado!"
                })
            }else {
                req.body.user_id = decoded.id;
                next();
            }
        }catch(err){
            return res.status(401).json({
                error: true,
                code: 130,
                message: "O token está inválido!"
            })
        }
    }
} 

export default AuthMidleware;

