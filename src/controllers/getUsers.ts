import {ServerResponse} from 'http'
import { CustomIncomingMessage } from '../types';

export const getUsers = (req: CustomIncomingMessage,res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(req.users));
    res.end();
}