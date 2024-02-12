import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
import writeDataToFile from "../utils/writeToFile";
import { CustomIncomingMessage, User } from '../types';

export const deleteUser = async (req: CustomIncomingMessage, res: ServerResponse) => {
    try {
        const id = req.url?.split('/')[3];
        if (id && !validate(id)) {
            res.statusCode = 400;
            res.end('Bad request');
            return
        }

        const users = req.users;
        if (!users) {
            res.statusCode = 404;
            res.end('No resources to delete. The database is already empty');
            return;
        }

        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex == -1) {
            res.statusCode = 404;
            res.end('User not found');
            return
        }

        await writeDataToFile(users.splice(userIndex, 1));
        res.statusCode = 204;
        res.end('User deleted');
    } catch (error) {
        res.statusCode = 500
        res.end('Server error')
    }
}