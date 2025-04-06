class CustomerController {
  constructor(service) {
    this.service = service;
  }

  async getAll() {
    const response = [];
    const students = await this.service.getAllStudents();
    for (const student of students) {
        let status = "";
        if (!student.debt && student.grade >= 70) {
            status = "Aprobado";
        } else if (!student.debt && student.grade < 70){
            status = "Pendiente";
        } else if (student.debt && student.grade >= 70){
            status = "Reestructura";
        } else {
            status = "Expulsado";
        }
        response.push({"matricula": student.id, "nombre": student.name, "estatus": status});
    }
    return response;
}


  async getAll() {
    return this.service.getAllCustomers();
  
  }

  async getById(id) {
    const customer = await this.service.getCustomerById(id);
    if (!customer) throw new Error('Customer not found new message');
    return customer;
  }

  async create(name, email) {
    return this.service.createCustomer(name, email);
  }

  async update(id, name, email) {
    return this.service.updateCustomer(id, name, email);
  }

  async delete(id) {
    await this.service.deleteCustomer(id);
    return { message: 'Customer deleted' };
  }
}

module.exports = StudentController;
module.exports = CustomerController;
