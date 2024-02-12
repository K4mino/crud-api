import { validate } from "uuid"
import { IncomingMessage, ServerResponse } from "http"
import { bodyParser } from "../utils/bodyParser"
import { User,CustomIncomingMessage } from "../types"
import writeDataToFile from "../utils/writeToFile";
export const updateUser = async(req: CustomIncomingMessage,res: ServerResponse) => {
    const id = req.url?.split('/')[3];
    if(id && !validate(id)){
        res.statusCode = 400;
        res.end('Bad request');
    }

    const users = req.users;
    if (!users) {
        res.statusCode = 404;
        res.end('No resources to update. The database is empty');
        return;
    }

    const userIndex = users.findIndex(user => user.id === id);
    if(!userIndex){
        res.statusCode = 404;
        res.end('User not found');
    }
    let body:unknown = await bodyParser(req);
    
    const userData = body as User;

    users[userIndex] = {...users[userIndex], ...userData};
    await writeDataToFile(users);
    res.statusCode = 200;
    res.end('User updated: ' + JSON.stringify(users[userIndex]));
}