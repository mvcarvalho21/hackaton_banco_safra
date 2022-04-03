require('dotenv').config();
import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from './routes';
import { errors } from 'celebrate';
const app = express();

const corsOptions = {
  };


app.use(express.json());
app.use(cors(corsOptions,{
    origin: ['http://localhost:3000']
}));

app.use(routes);

app.use(errors());

//token expired or without token
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Token expirado ou inexistente')
    res.status(401);
    next(error)
})

//Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Não encontrado')
    res.status(404);
    next(error);
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})

export { app }