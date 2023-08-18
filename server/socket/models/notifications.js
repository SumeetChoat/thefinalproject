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

    // static async getNotificationById(id) {
    //     const response = await db.query('SELECT * FROM notifications WHERE notification_id = $1', [id]);
    //     if (response.rows.length !== 1) {
    //         throw new Error("Unable to locate Notification");
    //     }
    //     return new Notifications(response.rows[0]);
    // }

    static async create_friend_req_response(sender, recipient, status) {
        const time = new Date();
        const message = `${recipient} has ${status} your friend request.` // status is either "accepted" or "rejected".
        const response = await db.query('INSERT INTO notifications(username, message, time_sent) VALUES ($1, $2, $3) RETURNING *;', [sender, message, time]);
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

    static async create_assignment_added(teacher, student) {
        const time = new Date();
        const message = `${teacher} has given you a new assignment.`
        const response = await db.query('INSERT INTO notifications(username, message, time_sent) VALUES ($1, $2, $3) RETURNING *', [student, message, time]);
        return new Notifications(response.rows[0]);
    }

    static async create_assignment_completed(teacher, student, time_taken) {
        const time = new Date();
        const message = `${student} has completed an assignment in ${time_taken}s.`
        const response = await db.query('INSERT INTO notifications(username, message, time_sent) VALUES ($1, $2, $3) RETURNING *', [teacher, message, time]);
        return new Notifications(response.rows[0]);
    }

    static async create_assignment_reminder(teacher, student) {
        const time = new Date();
        const message = `${teacher} is reminding you to complete an assignment.`
        const response = await db.query('INSERT INTO notifications(username, message, time_sent) VALUES ($1, $2, $3) RETURNING *', [student, message, time]);
        return new Notifications(response.rows[0]);
    }

    static async delete(username) {
        await db.query("DELETE FROM notifications WHERE username = $1;", [username]);
    }
}

module.exports = Notifications;