import users  from '../db.json';
import {IncomingMessage, ServerResponse} from 'http'
export const getUsers = (req: IncomingMessage,res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
}