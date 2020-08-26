export class Friendship {
    constructor(
        private userId: string,
        private userFriendId: string
    ){}

    public getUserId() :string {
        return this.userId
    }

    public getUserFriendId() :string {
        return this.userFriendId
    }
}