export class User {
    constructor(user) {
        this.id = user['custom:userId'];
        this.name = user.name;
        this.mobile = user.phone_number;
    }

}