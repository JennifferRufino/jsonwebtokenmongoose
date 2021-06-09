import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import * as yup from 'yup';

import {User} from '../models/User';

class UserController {
    public async show(req: Request, res: Response) {
        try{
            const todo = await User.find({});
            return res.status(201).json(todo);
        }catch(err){
            return res.status(400).json({
                message: err.message || 'Unexpected error.'
                
            });
        }
    }

    public async store(req: Request, res: Response){
         /**
            * Validação através do YUP schema
            * Início
        */
        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                message: "Dados inválidos"
            })
        }

         /**
             * Validação através do YUP schema
             * fim
         */

         
        /**
             * Validação no banco de dados
             * Verifica se o usuário existe
         */

        let userExist = await User.findOne({email: req.body.email});
        if(userExist) {
            return res.status(400).json({
                error: true,
                message: "Esse usuário já xiste"
            })
        }

        const {name, email, password} = req.body;

        const data = {name, email, password};

        data.password = await bcrypt.hash(data.password, 8);

        await User.create(data, (err) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro ao tentar inserir usuário no banco de dados"
                })
            }
            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso"
            })
        })
    }
}

export default UserController;