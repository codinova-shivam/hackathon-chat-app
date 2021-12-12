import moment from 'moment'
export class Message {
    constructor(message) {
        Object.assign(this, {
            senderId: message.from,
            content: message.message,
            _id: message.id,
            date: moment(message.sentAt).format('MMMM Do'),
            timestamp: moment(message.sentAt).format('LT'),
        })
    }

    static fromList(messages=[]){
        return messages.map(message=>new this(message))
    }
}