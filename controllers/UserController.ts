import { Router, Response, Request } from "express";
import { User } from '../models/User';

export class UserController {
    findUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id,
                }
            })
            console.log(user);
            return "hello form user";
        } catch(err) {
            res.status(500).send(err);
        }
    }
    createUser = async (req: Request, res: Response) => {
        try {
            const user = await User.create({
                email: req.body.email,
                password: req.body.password,
            });
            console.log(user);
            res.status(201).json(user);
            return "hello form user";
        } catch(err) {
            res.status(500).send(err);
        }   
    }
}