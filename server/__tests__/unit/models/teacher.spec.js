const db = require('../../../database/connect')
const Teacher = require('../../../models/Teachers')

const data = {rows:[
    {
        "teacher_id": 1,
        "username": "oliver1",
        "password": "$2b$10$KjOJX18bxsb9HLAxBDnjCeOBi.gyDC3Esi7Jt62CpcRhN1bL4YVF6",
        "email": "o@gmail.com",
        "token": "1398c56e-6edc-4beb-bf3a-b98aa59fc370"
    }
]}

const emptyResponse = {rows:[]};

describe('getOneByUsername', () => {
    test('Successfully returns one user', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce(data);

        const response = await Teacher.getOneByUsername("oliver1");
        expect(response).toBeInstanceOf(Teacher)
    })

    test('Returns the correct error', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce(emptyResponse);

        await expect(Teacher.getOneByUsername('Oliver')).rejects.toThrowError("Unable to locate teacher.");
    })
})