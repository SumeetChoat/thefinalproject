const request = require("supertest")
const api = require('../api')
const db = require('../database/connect')
const bcrypt = require('bcrypt')

describe("Students route", () => {
    let username = ""
    let password = ""
    
    const newStudent = {
        username: "test",
        password: "test",
        email: "test"
    }

    let token = ""

    it("Should return no students error", async() => {
        const resp = await request(app)
        .get('/students')
        .expect(404)

        expect(resp.body.Error).toBe('There are no students')
    })

    it("Should create a new student", async() => {
        const resp = await request(app)
        .post('/students/register')
        .send(newStudent)
        .expect(202)

        expect(resp.body.username).toEqual(newStudent.username)

        const correctPassword = await bcrypt.compare(resp.body.password, newStudent.password)
        expect(correctPassword).toEqual(true)
    })

    it("Should give error if register with duplicate username", async() => {
        const resp = await request(app)
        .post('/students/register')
        .send(newStudent)
        .expect(500)

        expect(resp.body.Error).toBe(`duplicate key value violates unique constraint \"users_username_key\"`)
    })

    it("Should give error if log in with wrong details", async() => {
        const resp =  await request(app)
        .post('/students/login')
        .send({
            username: "1",
            password: "1",
            email: "1"
        })
        .expect(403)
        expect(resp.body.Error).toBe("Incorrect credentials")
    })

    it("Should login with correct details", async() => {
        //
    })
})
