import express, { Application, Request, Response } from 'express';
import { userRouter } from './routes/UserRoute';


const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello Express");
})

app.use('/api/users', userRouter);

app.listen(9000, (): void => {
    console.group("server started at http://localhost:9000");
})