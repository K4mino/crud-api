import { validate } from "uuid"
import { IncomingMessage, ServerResponse } from "http"
import users  from "../db.json"
import { bodyParser } from "../utils/bodyParser"
import { User } from "../types"
export const updateUser = async(req: IncomingMessage,res: ServerResponse) => {
    const id = req.url?.split('/')[3];
    if(id && !validate(id)){
        res.statusCode = 400;
        res.end('Bad request');
    }
    const userIndex = users.findIndex(user => user.id === id);
    if(!userIndex){
        res.statusCode = 404;
        res.end('User not found');
    }
    let body:unknown = await bodyParser(req);
    
    const userData = body as User;

    users[userIndex] = {...users[userIndex], ...userData};

    res.end('User updated');
}