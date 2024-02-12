import { IncomingMessage, ServerResponse } from 'http';
import { bodyParser } from '../utils/bodyParser';
import { User,CustomIncomingMessage } from '../types';
import crypto from 'crypto';
import writeDataToFile from '../utils/writeToFile';


const isValid = (data: any): data is User => {
    return (
        typeof data.username === 'string' &&
        typeof data.age === 'number' &&
        Array.isArray(data.hobbies) &&
        data.hobbies.every((hobby: any) => typeof hobby === 'string')
    );
};
export const createUser = async(req: CustomIncomingMessage,res: ServerResponse) => {
   try {
    let body:unknown = await bodyParser(req);
    
    const userData = body as User;

    userData.id = crypto.randomUUID();
    
    if(isValid(body)){
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        req.users?.push(userData);
        await writeDataToFile(userData);
        res.end('User created');
    } else{
        res.statusCode = 400;
        res.end('Request body is not valid');
    }
   } catch (error) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Request body is not valid'}));
   }
}
