const db = require('../../database/connect');

class Messages {
    constructor({message_id, sender, recipient, type, content, time_sent}) {
        this.message_id = message_id
        this.sender = sender
        this.recipient = recipient
        this.type = type
        this.content = content
        this.time_sent = time_sent
    }

    static async getAll(name) {
        const response = await db.query('SELECT * FROM messages WHERE sender = $1 OR recipient = $1', [name])
        return response.rows.map(frnd => new Messages(frnd))
    }

    static async create(data) {
        const time = new Date();
        const {sender, recipient, type, content} = data;
        const response = await db.query('INSERT into messages(sender, recipient, type, content, time_sent) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [sender, recipient, type, content, time]);
        return new Messages(response.rows[0])
    }
}

module.exports = Messages;