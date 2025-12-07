/**
 * Basic customer service implementation
 * Works with in-memory repository
 */
class CustomerService {
  constructor(repository) {
    this.repository = repository; // Simple data repository/array
  }

  // Find all customers
  async findAll(options = {}) {
    let customers = [...this.repository];
    
    // Simple search
    if (options.search) {
      const searchTerm = options.search.toLowerCase();
      customers = customers.filter(customer => 
        customer.name?.toLowerCase().includes(searchTerm) ||
        customer.email?.toLowerCase().includes(searchTerm) ||
        customer.phone?.includes(searchTerm)
      );
    }
    
    // Filter by status
    if (options.status) {
      customers = customers.filter(customer => customer.status === options.status);
    }
    
    // Basic pagination
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedCustomers = customers.slice(startIndex, endIndex);
    
    return {
      data: paginatedCustomers,
      pagination: {
        page,
        limit,
        total: customers.length,
        totalPages: Math.ceil(customers.length / limit),
        hasNextPage: endIndex < customers.length,
        hasPrevPage: startIndex > 0
      }
    };
  }

  // Find customer by ID
  async findById(id) {
    return this.repository.find(customer => customer.id === parseInt(id));
  }

  // Find customer by email
  async findByEmail(email) {
    return this.repository.find(customer => customer.email === email);
  }

  // Create new customer
  async create(customerData) {
    // Generate ID
    const newId = this.repository.length > 0 
      ? Math.max(...this.repository.map(c => c.id)) + 1 
      : 1;
    
    const newCustomer = {
      id: newId,
      ...customerData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.repository.push(newCustomer);
    return newCustomer;
  }

  // Update customer
  async update(id, updateData) {
    const index = this.repository.findIndex(customer => customer.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Customer not found');
    }
    
    // Check email uniqueness if email is being updated
    if (updateData.email && updateData.email !== this.repository[index].email) {
      const emailExists = await this.findByEmail(updateData.email);
      if (emailExists) {
        throw new Error('Email already exists');
      }
    }
    
    // Update customer
    this.repository[index] = {
      ...this.repository[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return this.repository[index];
  }

  // Delete customer
  async delete(id) {
    const index = this.repository.findIndex(customer => customer.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Customer not found');
    }
    
    // Remove customer from array
    const deletedCustomer = this.repository.splice(index, 1)[0];
    return deletedCustomer;
  }

  // Count customers by status
  async countByStatus() {
    const counts = {
      active: 0,
      inactive: 0,
      pending: 0,
      total: this.repository.length
    };

    this.repository.forEach(customer => {
      if (counts[customer.status] !== undefined) {
        counts[customer.status]++;
      }
    });

    return counts;
  }

  // Search customers
  async search(query) {
    if (!query) {
      return this.findAll();
    }
    
    const searchTerm = query.toLowerCase();
    const customers = this.repository.filter(customer => 
      customer.name?.toLowerCase().includes(searchTerm) ||
      customer.email?.toLowerCase().includes(searchTerm) ||
      customer.phone?.includes(searchTerm) ||
      customer.address?.toLowerCase().includes(searchTerm)
    );
    
    return {
      data: customers,
      total: customers.length
    };
  }
}

module.exports = CustomerService;