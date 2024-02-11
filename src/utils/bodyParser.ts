import { IncomingMessage, ServerResponse } from 'http'

export const bodyParser = (req: IncomingMessage) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            })

            req.on('end', () => {
                if(body){
                    resolve(JSON.parse(body))
                }else{
                    resolve({})
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}