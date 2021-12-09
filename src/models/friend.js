export class Friend {

    constructor(friend) {
        this.roomId = friend.id;
        this.roomName = friend.name || friend.mobile;
        this.avatar = 'assets/imgs/people.png';

        this.users = [
            {
                _id: friend.id,
                username: friend.name || friend.mobile,
              
            }
        ]
    }


    static fromList(friends = []) {
        return friends.map(friend => new Friend(friend));
    }
}