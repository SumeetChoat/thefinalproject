const db = require('../../database/connect');

class Friend_Requests {
    constructor({request_id, sender, recipient}) {
        this.request_id = request_id
        this.sender = sender
        this.recipient = recipient
    }

    static async getOne(sender, recipient) {
        const response = await db.query("SELECT * FROM friend_requests WHERE sender = $1 AND recipient = $2;", [sender, recipient]);
        return new Friend_Requests(response.rows[0])
    }

    static async getAll(name) {
        const response = db.query('SELECT * FROM friend_requests WHERE sender = $1 OR recipient = $1', [name])
        return response.rows.map(fr_req => new Friend_Requests(fr_req))
    }

    static async create(data) {
        const {sender, recipient} = data;
        const response = await db.query('INSERT INTO friend_requests (sender, recipient) VALUES ($1, $2) RETURNING *;', [sender, recipient]);
        return new Friend_Requests(response.rows[0])
    }

    async delete() {
        const response = await db.query("DELETE FROM friend_requests WHERE request_id = $1 RETURNING *;", [this.request_id]);
        return new Friend_Requests(response.rows[0])
    }
}

module.exports = Friend_Requests;