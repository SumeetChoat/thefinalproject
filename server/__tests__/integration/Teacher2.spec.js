require("dotenv").config()
const request = require('supertest');
const {createDBEnv, destroyDBEnv} = require('../../database/setup-test-db')
const api = require('../../api')

describe("Testing the Teacher routes", () => {
    let app;
    beforeAll(async () => {
        app = api.listen(process.env.TEST_PORT, () => console.log(`Test server running on port ${process.env.TEST_PORT}.`));
        await createDBEnv();
    })

    afterAll(async () => {
        await destroyDBEnv();
        app.close()
        console.log("Test server closed.")
    })

    test('Testing teacher register route', async () => {
        const data = {
            "username" : "Oliver",
            "password" : "1",
            "email" : "oliver@gmail.com",
        }

        const response = await request(app).post('/teacher/register').send(data);
        expect(response.body.username).toBe("Oliver")
        expect(response.body.email).toBe("oliver@gmail.com")
    })

    test('Testing teacher login route', async () => {
        const data = {
            "username" : "Oliver",
            "password" : "1"
        }
        const response = await request(app).post('/teacher/login').send(data);
        expect(response.status).toBe(200);
        expect(response.body.username).toBe("Oliver");
    })


})