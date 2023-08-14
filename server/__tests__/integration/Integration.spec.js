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

    describe('Teacher routes', () => {
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

    describe('Student routes', () => {
        const newStudent = {
            username: "test",
            password: "test",
            email: "test"
        }

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
            .expect(201)
    
            expect(resp.body.username).toEqual(newStudent.username)
        })

        // it("Should give error if register with duplicate username", async() => {
    //     const resp = await request(app)
    //     .post('/students/register')
    //     .send(newStudent)
    //     .expect(500)

    //     expect(resp.body.Error).toBe(`duplicate key value violates unique constraint \"users_username_key\"`)
    // })

        it("Should give error if log in with wrong details", async() => {
            const resp =  await request(app)
            .post('/students/login')
            .send({
                username: "test",
                password: "1",
                email: "1"
            })
            .expect(403)
            expect(resp.body.Error).toBe("Incorrect credentials")
        })
    
        it("Should login with correct details", async() => {
            const resp = await request(app)
            .post('/students/login')
            .send(newStudent)
            .expect(200)
    
            expect(resp.body.username).toEqual(newStudent.username)
        })
    })
})