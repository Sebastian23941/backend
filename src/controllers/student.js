class StudentController {
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
}

module.exports = StudentController;
