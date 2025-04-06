class CustomerHttpHandler {
  constructor(customerController) {
    this.customerController = customerController;
  }

  async getAllCustomers(req, res) {
    try {
      const customers = await this.customerController.getAll();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCustomerById(req, res) {
    try {
      const customer = await this.customerController.getById(req.params.id);
      res.json(customer);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createCustomer(req, res) {
    try {
      const { name, email } = req.body;
      /*if (name == ''){
        res.status(400).son({ error: error.message });
      }*/
      const customer = await this.customerController.create(name, email);
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCustomer(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const customer = await this.customerController.update(id, name, email);
      res.json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCustomer(req, res) {
    try {
      const { id } = req.params;
      await this.customerController.delete(id);
      res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Export the class directly
module.exports = CustomerHttpHandler;