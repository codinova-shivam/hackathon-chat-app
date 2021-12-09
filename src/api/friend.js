import { get } from "./request";

export class FriendService {
    static getAll() {
        return get('/friends')
    }
}