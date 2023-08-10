const db = require('../../database/connect');

class Notifications {
    constructor({notification_id, username, message}) {
        this.notification_id = notification_id
        this.username = username
        this.message = message
    }

    static async getAll(name) {
        const response = db.query('SELECT * FROM notifications WHERE username = $1;', [name])
        return response.rows.map(not => new Notifications(not))
    }

    static async create_friend_req_response(username, status) {
        const message = `${username} has ${status} your friend request.` // status is either "accepted" or "rejected".
        const response = await db.query('INSERT INTO notifications(username, message) VALUES ($1, $2) RETURNING *;', [username, message]);
        return new Notifications(response.rows[0]);
    }

    static async create_friend_req_received(username) {
        const message = `${username} has sent you a friend request.` // status is either "accepted" or "rejected".
        const response = await db.query('INSERT INTO notifications(username, message) VALUES ($1, $2) RETURNING *;', [username, message]);
        return new Notifications(response.rows[0]);
    }

    static async create_message_received(username) {
        const message = `${username} has sent you a message.` // status is either "accepted" or "rejected".
        const response = await db.query('INSERT INTO notifications(username, message) VALUES ($1, $2) RETURNING *;', [username, message]);
        return new Notifications(response.rows[0]);
    }

    async delete() {
        const response = await db.query("DELETE FROM notifications WHERE notification_id = $1 RETURNING *;", [this.notification_id]);
        return new Notifications(response.rows[0]);
    }
}

module.exports = Notifications;