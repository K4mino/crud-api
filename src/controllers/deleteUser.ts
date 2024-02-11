import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
import users  from "../db.json";
import writeDataToFile from "../utils/writeToFile";
export const deleteUser = async(req: IncomingMessage,res: ServerResponse) => {
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

    await writeDataToFile(users.splice(userIndex, 1));
    res.statusCode = 204;
    res.end('User deleted');
}