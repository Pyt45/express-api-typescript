import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token;

        if (!token)
            return res.status(404).json({
                msg: 'Unauthorized'
            });
        let payload;
        if (process.env.JWT_TOKEN)
            payload = await jwt.verify(token, process.env.JWT_TOKEN);
        // req.userId = payload.id;
        if (payload)
            return next();
        return "Unauthorized";
    } catch(err) {
        return err;
    }
}