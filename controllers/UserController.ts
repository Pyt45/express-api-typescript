import { Response, Request } from "express";
import { User } from '../models/User';
import { generateToken } from "../utils/generateToken";

export class UserController {
    findUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id,
                }
            })
            console.log(user);
            res.status(200).json(user);
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
            let token;
            const payload = {
                user: {
                    id: user?.id,
                    email: user?.email
                }
            }
            if (user)
                token = await generateToken(payload);
            res.status(201).json({
                user: user,
                access_token: token,
            });
        } catch(err) {
            res.status(500).send(err);
        }   
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({where: { email: email }});
            if (!user)
                res.status(404).json({
                    msg: 'Invalid credientiels'
                });
            if (user && password != user.password) {
                res.status(404).json({
                    msg: 'Invalid credientiels'
                });
            }
            let token;
            const payload = {
                user: {
                    id: user?.id,
                    email: user?.email
                }
            }
            if (user)
                token = await generateToken(payload);
            return await res.cookie("access_token", token, {
                httpOnly: true,
                secure: false,
            }).status(200).json({
                msg: 'Successfully logged in'
            });
        } catch(err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    logout = async (req: Request, res: Response) => {
        try { 
            await res.clearCookie('access_token');
            res.status(200).json({
                    msg: 'Successuflly logged out'
                });
        } catch(err) {
            res.status(500).send(err);
        }
    }
}