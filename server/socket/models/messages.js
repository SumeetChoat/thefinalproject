const db = require('../../database/connect');

class Messages {
    constructor({message_id, sender, recipient, type, content}) {
        this.message_id = message_id
        this.sender = sender
        this.recipient = recipient
        this.type = type
        this.content = content
    }

    static async getAll(name) {
        const response = db.query('SELECT * FROM messages WHERE sender = $1 OR recipient = $1', [name])
        return response.rows.map(msg => new Messages(msg))
    }

    static async create(data) {
        const {message_id, sender, recipient, type, content} = data;
        const response = await db.query('INSERT into messages(message_id, sender, recipient, type, content) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [message_id, sender, recipient, type, content]);
        return new Messages(response.rows[0])
    }
}

module.exports = Messages;