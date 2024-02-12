import {IncomingMessage, ServerResponse} from 'http'
import { validate } from 'uuid';
import { CustomIncomingMessage } from '../types';

export const getUserById = (req: CustomIncomingMessage,res: ServerResponse) => {
    try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json'); 
    const id = req.url?.split('/')[3];
    const user = req.users?.find(user => user.id === id);

    if(!user){
        res.statusCode = 404;
        res.end('User not found');
        return
    }

    if(id && !validate(id)){
        res.statusCode = 400;
        res.end('Bad request');
        return
    }

    res.write(JSON.stringify(user));
    res.end()
    } catch (error) {
        res.statusCode = 500
        res.end('Server error')
    }
}