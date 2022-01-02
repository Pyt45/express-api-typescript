import express, { Application, Request, Response } from 'express';
import { handleRouter } from './routes/HandleRoute';
import cookieParser from 'cookie-parser';
import { sequelize } from './instance/instance';
import dotenv from 'dotenv';

dotenv.config();


const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello Express");
})

app.use('/api', handleRouter);

sequelize.sync().then(() => {
    app.listen(process.env.BACKEND_PORT, (): void => {
        console.log("server started at http://localhost:9000");
    })
}).catch(err => {
    console.log(err);
})