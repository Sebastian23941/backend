const StudentController = require('../controllers/student');

describe('StudentController', () => {
  let mockService;
  let controller;

  beforeEach(() => {
    mockService = {
      getAllStudents: jest.fn(),
    };
    controller = new StudentController(mockService);
  });

  test('should get all students', async () => {
    
    const mockStudents = [
        {id: 1, name: "Juan Perez", grade: 90, debt: false},
        {id: 2, name: "Maria Lopez", grade: 80, debt: true},
        {id: 3, name: "Carlos Ruiz", grade: 60, debt: false},
        {id: 4, name: "Ana Torres", grade: 55, debt: true},
    ];
      
    const expectedResult = [
        {matricula: 1, nombre: 'Juan Perez', estatus: "Aprobado" },
        {matricula: 2, nombre: 'Maria Lopez', estatus: "Reestructura" },
        {matricula: 3, nombre: 'Carlos Ruiz', estatus: "Pendiente" },
        {matricula: 4, nombre: 'Ana Torres', estatus: "Expulsado" }
    ];

    mockService.getAllStudents.mockResolvedValue(mockStudents);

    const result = await controller.getAll();
    expect(result).toEqual(expectedResult);
    expect(mockService.getAllStudents).toHaveBeenCalledTimes(1);
  });

});
