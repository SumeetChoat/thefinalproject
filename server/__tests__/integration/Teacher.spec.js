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

    test('Testing / route', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(200);
    })

    test('Testing teacher register route', async () => {
        const data = {
            "username" : "Oliver",
            "password" : "1",
            "email" : "oliver@gmail.com",
        }

        const response = await request(app).post('/teacher/register').send(data);
        console.log(response.body);


    })


})