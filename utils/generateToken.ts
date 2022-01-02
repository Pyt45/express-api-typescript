import * as jwt from 'jsonwebtoken';

export interface IUser {
    email: string;
    password: string;
}

export const generateToken = async (payload: jwt.JwtPayload) => {
    try {
        const token = await jwt.sign(payload, 'secretToken');
        return token;
    }catch(err) {
        return err;
    }
}