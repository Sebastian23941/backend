const request = require('supertest');
const express = require('express');

const StudentHttpHandler = require('../handlers/students');

jest.mock('../controllers/student');

describe('StudentHttpHandler', () => {
  let app;
  let mockController;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockController = {
      getAll: jest.fn()
    };

    const httpHandler = new StudentHttpHandler(mockController);

    app.get('/students', httpHandler.getAllStudents.bind(httpHandler));

  });

  describe('GET /students', () => {
    it('should return all students', async () => {

        const students = [
          {id: 1, name: "Juan Perez", grade: 90, debt: true},
          {id: 2, name: "Maria Lopez", grade: 80, debt: false},
          {id: 3, name: "Carlos Ruiz", grade: 60, debt: true},
          {id: 4, name: "Ana Torres", grade: 55, debt: false}
        ];

        
        mockController.getAll.mockResolvedValue(students);

        const response = await request(app)
            .get('/students')
            .expect(200);

        expect(response.body).toEqual(students);
        expect(mockController.getAll).toHaveBeenCalled();
    });
  });

});
