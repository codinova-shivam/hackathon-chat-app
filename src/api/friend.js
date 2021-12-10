import { get, post } from "./request";

export class FriendService {
    static getAll() {
        return get('/friends')
    }

    static add(mobile) {
        return post('/friends',{mobile})
    }
}