import { User } from '../types';
import { writeFile } from 'node:fs/promises';

export default async function writeDataToFile(data: User | User[] | undefined) {
    try {
        await writeFile('../db.json', JSON.stringify(data),'utf-8');
    } catch (error) {
        console.log(error)
    }
}