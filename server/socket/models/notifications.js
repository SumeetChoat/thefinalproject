const db = require('../../database/connect');

class Notifications {
    constructor({notification_id, username, message, time_sent}) {
        this.notification_id = notification_id
        this.username = username
        this.message = message
        this.time_sent = time_sent
    }

    static async getAll(name) {
        const response = await db.query('SELECT * FROM notifications WHERE username = $1;', [name])
        return response.rows.map(frnd => new Notifications(frnd))
    }

    static async create_friend_req_response(sender, recipient, status) {
        const time = new Date();
        const message = `${sender} has ${status} your friend request.` // status is either "accepted" or "rejected".
        const response = await db.query('INSERT INTO notifications(username, message, time_sent) VALUES ($1, $2, $3) RETURNING *;', [recipient, message, time]);
        return new Notifications(response.rows[0]);
    }

    static async create_friend_req_received(sender, recipient) {
        const time = new Date();
        const message = `${sender} has sent you a friend request.` // status is either "accepted" or "rejected".
        const response = await db.query('INSERT INTO notifications(username, message, time_sent) VALUES ($1, $2, $3) RETURNING *;', [recipient, message, time]);
        return new Notifications(response.rows[0]);
    }

    static async create_message_received(sender, recipient) {
        const time = new Date();
        const message = `${sender} has sent you a message.` // status is either "accepted" or "rejected".
        const response = await db.query('INSERT INTO notifications(username, message, time_sent) VALUES ($1, $2, $3) RETURNING *;', [recipient, message, time]);
        return new Notifications(response.rows[0]);
    }

    async delete() {
        const response = await db.query("DELETE FROM notifications WHERE notification_id = $1 RETURNING *;", [this.notification_id]);
        return new Notifications(response.rows[0]);
    }
}

module.exports = Notifications;