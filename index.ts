import http from 'http';
import dotenv from 'dotenv';
import { getUsers } from './src/controllers/getUsers';
import { getUserById } from './src/controllers/getUserById';
import { createUser } from './src/controllers/createUser';
import { updateUser } from './src/controllers/updateUser';
import { deleteUser } from './src/controllers/deleteUser';
import { ServerResponse } from 'http'
import { CustomIncomingMessage } from './src/types';
import users from './src/db.json';


const PORT = process.env.PORT || 3000;



const server = http.createServer(async(req :CustomIncomingMessage, res: ServerResponse) => {
    req.users = users
    if(req.method === 'GET' && req.url === '/api/users'){
        getUsers(req, res);
    }else if(req.method === 'GET' && req.url?.startsWith('/api/users')){
        getUserById(req, res);
    }else if(req.method === 'POST' && req.url === '/api/users'){
        await createUser(req,res)
    }else if (req.method === 'PUT' && req.url?.startsWith('/api/users')) {
       await updateUser(req, res);
    } else if (req.method === 'DELETE' && req.url?.startsWith('/api/users')) {
       await deleteUser(req, res);
    }

    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Route not found'}));
    }

    
});


server.listen(3000, () => console.log(`Server is running on port ${PORT}`));