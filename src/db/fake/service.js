const DBService = require('../dbService');

class FakeService extends DBService {
  constructor() {
    super();
    this.customers = new Map();
    // Initialize with 5 dummy customers
    const dummyCustomers = [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
      { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com' },
      { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com' },
      { id: '5', name: 'Charlie Wilson', email: 'charlie.wilson@example.com' },
    ];
    
    this.students = new Map();
    const dummyStudents = [
      {id: 1, name: "Juan Perez", grade: 90, debt: false},
      {id: 2, name: "Maria Lopez", grade: 80, debt: true},
      {id: 3, name: "Carlos Ruiz", grade: 60, debt: false},
      {id: 4, name: "Ana Torres", grade: 55, debt: true},
    ];

    dummyCustomers.forEach((customer) => {
      this.customers.set(customer.id, customer);
    });

    dummyStudents.forEach((student) => {
      this.students.set(student.id, student);
    });
  }

  async getAllCustomers() {
    return Array.from(this.customers.values());
  }

  async getAllStudents() {
    return Array.from(this.students.values());
  }

  async getCustomerById(id) {
    return this.customers.get(id);
  }
  //--------------
  async createCustomer(name, email) {
    const id = Date.now().toString();
    const customer = { id, name, email };
    this.customers.set(id, customer);
    return customer;
  }

  async updateCustomer(id, name, email) {
    const customer = { id, name, email };
    this.customers.set(id, customer);
    return customer;
  }

  async deleteCustomer(id) {
    this.customers.delete(id);
  }

}

module.exports = FakeService;
