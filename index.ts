import express, { Application, Request, Response } from 'express';
import { handleRouter } from './routes/HandleRoute';
import { auth } from './middlewares/auth';
import { Product } from './models/Product';


const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello Express");
})

app.use('/api', handleRouter);


app.listen(9000, (): void => {
    console.group("server started at http://localhost:9000");
})