import users  from '../db.json';
import {IncomingMessage, ServerResponse} from 'http'
import { validate } from 'uuid';

export const getUserById = (req: IncomingMessage,res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const id = req.url?.split('/')[3];
    const user = users.find(user => user.id === id);

    if(!user){
        res.statusCode = 404;
        res.end('User not found');
    }

    if(id && !validate(id)){
        res.statusCode = 400;
        res.end('Bad request');
    }

    res.write(JSON.stringify(user));
    res.end()
}