const app = require('../app')
const request = require('supertest')

const { sequelize } = require('../models')
const { queryInterface } = sequelize

const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4ODk2MTc4LCJleHAiOjE2ODg5ODI1Nzh9.Vleig6FPEKkUAe9z30oeA7jhu8VkTJNr2Ss5psT2FKo'

afterAll(() => {
    queryInterface.bulkDelete(
        'Categories', null,
        { truncate: true, cascade: true, restartIdentity: true }
    )
})

describe('POST /category', () => {
    test('Success test', async () => {
        const payload = { name: "Hoody" }

        const response = await request(app)
            .post('/categories')
            .send(payload)
            .set('access_token', access_token)

        expect(response.status).toBe(201)
        expect(response.body.data).toBeInstanceOf(Object)
        expect(response.body.data).toHaveProperty('id', expect.any(Number))
        expect(response.body.data).toHaveProperty('name', expect.any(String))
    })

    test('Failed test', async () => {
        const payload = { name: "" }

        const response = await request(app)
            .post('/categories')
            .send(payload)
            .set('access_token', access_token)

        expect(response.status).toBe(400)
        expect(response.body.message).toBeInstanceOf(Array)
    })
})