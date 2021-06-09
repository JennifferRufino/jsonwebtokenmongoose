import express, {Request, Response} from 'express';
import connection from './config/connection';
import {routes} from './routes/user';

const app = express();

connection();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("OPA");
})

app.use(routes);

app.listen(3333);