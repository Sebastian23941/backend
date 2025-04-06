const CustomerController = require('../controllers/customer');
const StudentController = require('../controllers/student');

describe('CustomerController', () => {
  let mockService;
  let controller;

  beforeEach(() => {
    mockService = {
      getAllCustomers: jest.fn(),
      getCustomerById: jest.fn(),
      createCustomer: jest.fn(),
      updateCustomer: jest.fn(),
      deleteCustomer: jest.fn(),
    };
    controller = new CustomerController(mockService);
  });

  test('should get all customers', async () => {
    const customers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    mockService.getAllCustomers.mockResolvedValue(customers);

    const result = await controller.getAll();
    expect(result).toEqual(customers);
    expect(mockService.getAllCustomers).toHaveBeenCalledTimes(1);
  });

  test('should get customer by ID', async () => {
    const customer = { id: 1, name: 'John Doe', email: 'john@example.com' };
    mockService.getCustomerById.mockResolvedValue(customer);

    const result = await controller.getById(1);
    expect(result).toEqual(customer);
    expect(mockService.getCustomerById).toHaveBeenCalledWith(1);
  });

  test('should throw an error if customer not found', async () => {
    mockService.getCustomerById.mockResolvedValue(null);

    await expect(controller.getById(1)).rejects.toThrow('Customer not found');
  });

  test('should create a customer', async () => {
    const newCustomer = { id: 1, name: 'John Doe', email: 'john@example.com' };
    mockService.createCustomer.mockResolvedValue(newCustomer);

    const result = await controller.create('John Doe', 'john@example.com');
    expect(result).toEqual(newCustomer);
    expect(mockService.createCustomer).toHaveBeenCalledWith('John Doe', 'john@example.com');
  });

  test('should update a customer', async () => {
    const updatedCustomer = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    mockService.updateCustomer.mockResolvedValue(updatedCustomer);

    const result = await controller.update(1, 'John Doe', 'john.doe@example.com');
    expect(result).toEqual(updatedCustomer);
    expect(mockService.updateCustomer).toHaveBeenCalledWith(1, 'John Doe', 'john.doe@example.com');
  });

  test('should delete a customer', async () => {
    mockService.deleteCustomer.mockResolvedValue();

    const result = await controller.delete(1);
    expect(result).toEqual({ message: 'Customer deleted' });
    expect(mockService.deleteCustomer).toHaveBeenCalledWith(1);
  });
});

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
        {id: 1, name: "Juan Perez", grade: 90, debt: true},
        {id: 2, name: "Maria Lopez", grade: 80, debt: false},
        {id: 3, name: "Carlos Ruiz", grade: 60, debt: true},
        {id: 4, name: "Ana Torres", grade: 55, debt: false},
    ];
      
    const expectedResult = [
        {matricula: '1', nombre: 'Juan Perez', estatus: "Aprobado" },
        {matricula: '2', nombre: 'Maria Lopez', estatus: "Reestructura" },
        {matricula: '3', nombre: 'Carlos Ruiz', estatus: "Pendiente" },
        {matricula: '4', nombre: 'Ana Torres', estatus: "Expulsado" }
    ];

    mockService.getAllStudents.mockResolvedValue(mockStudents);

    const result = await controller.getAll();
    expect(result).toEqual(expectedResult);
    expect(mockService.getAllStudents).toHaveBeenCalledTimes(1);
  });

});
