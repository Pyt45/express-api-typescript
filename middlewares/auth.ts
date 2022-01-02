import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await req.cookies.access_token;
        console.log(`token is: ${token}`);
        if (!token)
            return res.status(404).json({
                msg: 'Empty token'
            });
        const payload = await jwt.verify(token, 'secretToken');
        // req.userId = payload.id;
        //if (payload)
        return next();
        //return "Invalid token";
    } catch(err) {
        return err;
    }
}