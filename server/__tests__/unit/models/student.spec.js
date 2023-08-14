const db = require('../../../database/connect')
const Students = require('../../../models/Students');

const data = {rows:[
    {
        "student_id": 1,
        "username": "oliver1",
        "password": "$2b$10$KjOJX18bxsb9HLAxBDnjCeOBi.gyDC3Esi7Jt62CpcRhN1bL4YVF6",
        "email": "o@gmail.com",
        "token": "1398c56e-6edc-4beb-bf3a-b98aa59fc370",
        "points" : 0
    },
    {
        "student_id": 2,
        "username": "oliver",
        "password": "$2b$10$KjOJX18bxsb9HLAxBDnjCeOBi.gyDC3Esi7Jt62CpcRhN1bL4YVF6",
        "email": "o1@gmail.com",
        "token": "2398c56e-6edc-4beb-bf3a-b98aa59fc370",
        "points" : 0
    },
    {
        "student_id": 3,
        "username": "oliver2",
        "password": "$2b$10$KjOJX18bxsb9HLAxBDnjCeOBi.gyDC3Esi7Jt62CpcRhN1bL4YVF6",
        "email": "o2@gmail.com",
        "token": "3398c56e-6edc-4beb-bf3a-b98aa59fc370",
        "points" : 0
    }
]}

const emptyResponse = {rows:[]};

describe('getStudents', () => {
    test('Successfully returns three users', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce(data);

        const response = await Students.getStudents()
        expect(response).toHaveLength(3)
        response.forEach(resp => expect(Object.keys(resp)).toHaveLength(6))
        response.forEach(resp => expect(resp.username).toBeDefined())
    })

    test('Successfully returns error for no students', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce(emptyResponse);

        await expect(Students.getStudents()).rejects.toThrowError('There are no students');
    })
})

describe('getOneByUsername', ()=>{
    test('Successfully returns only one user', async() => {
        jest.spyOn(db, 'query').mockResolvedValueOnce({rows:[data.rows[0]]});

        const response = await Students.getOneByUsername("oliver1");
        expect(response).toBeInstanceOf(Students);
    })

    test('Returns error when more or less than 1 user is returned', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce(emptyResponse);

        await expect(Students.getOneByUsername()).rejects.toThrowError('Unable to locate student');
    })
})

describe('getOneByID', ()=>{
    test('Successfully returns only one user', async() => {
        jest.spyOn(db, 'query').mockResolvedValueOnce({rows:[data.rows[0]]});

        const response = await Students.getOneByID(1);
        expect(response).toBeInstanceOf(Students);
    })

    test('Returns error when more or less than 1 user is returned', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce(emptyResponse);

        await expect(Students.getOneByID()).rejects.toThrowError('Unable to locate student');
    })
})

describe('deleteStudent', () => {
    test('Successfully deletes student', async () => {
        jest.spyOn(db, 'query').mockResolvedValue({rows:[data.rows[0]]});
        const student = new Students(data.rows[0])

        const response = await student.deleteStudent()
        expect(response).toBeInstanceOf(Students);
    })
})