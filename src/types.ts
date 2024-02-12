import { IncomingMessage} from 'http'

export type User = {
    id: string,
    username: string,
    age: number,
    hobbies: string[]
}

export interface CustomIncomingMessage extends IncomingMessage {
    users?: User[]; 
}