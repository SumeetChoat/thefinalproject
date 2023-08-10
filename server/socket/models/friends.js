const db = require('../../database/connect');

class Friends {
    constructor({friend_id, user1, user2}) {
        this.friend_id = friend_id
        this.user1 = user1
        this.user2 = user2
    }

    static async getAllFriends(name) {
        const response = db.query('SELECT * FROM friends WHERE user1 = $1 OR user2 = $1', [name])
        return response.rows.map(frnd => new Friends(frnd))
    }

    static async create(user1, user2) {
        const response = db.query("INSERT INTO friends (user1, user2) VALUES ($1, $2) RETURNING *;", [user1, user2]);
        return new Friends(response.rows[0])
    }
}

module.exports = Friends;