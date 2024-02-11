import { readFile, writeFile } from 'node:fs/promises';
import { User } from '../types';
export default async function deleteDataFromFile(id: string | undefined) {
    try {
        const data = await readFile('./db.json', 'utf-8');
        const users = JSON.parse(data);
        const filteredUsers = users.filter((user: User) => user.id !== id);
        await writeFile('./db.json', JSON.stringify(filteredUsers));
    } catch (error) {
        console.log(error);
    }
}