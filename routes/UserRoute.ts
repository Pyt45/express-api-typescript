import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
export const userRouter = Router();

const userController = new UserController();

userRouter.get('/:id', userController.findUser)
userRouter.post('/', userController.createUser)