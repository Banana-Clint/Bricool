class ContractorService {
  constructor(repository) {
    this.repository = repository; // Simple data repository/array
  }

  // Find all contractors
  async findAll(options = {}) {
    let contractors = [...this.repository];
    
    // Simple search
    if (options.search) {
      const searchTerm = options.search.toLowerCase();
      contractors = contractors.filter(contractor => 
        contractor.companyName?.toLowerCase().includes(searchTerm) ||
        contractor.contactName?.toLowerCase().includes(searchTerm) ||
        contractor.email?.toLowerCase().includes(searchTerm) ||
        contractor.phone?.includes(searchTerm) ||
        contractor.taxId?.includes(searchTerm)
      );
    }
    
    // Filter by status
    if (options.status) {
      contractors = contractors.filter(contractor => contractor.status === options.status);
    }
    
    // Filter by contractor type
    if (options.contractorType) {
      contractors = contractors.filter(contractor => contractor.contractorType === options.contractorType);
    }
    
    // Filter by speciality
    if (options.speciality) {
      contractors = contractors.filter(contractor => 
        contractor.specialities?.includes(options.speciality)
      );
    }
    
    // Filter by rating
    if (options.minRating) {
      const minRating = parseFloat(options.minRating);
      contractors = contractors.filter(contractor => 
        contractor.rating !== undefined && contractor.rating >= minRating
      );
    }
    
    // Filter by active status
    if (options.isActive !== undefined) {
      const isActive = options.isActive === 'true' || options.isActive === true;
      contractors = contractors.filter(contractor => contractor.isActive === isActive);
    }
    
    // Sort options
    if (options.sortBy) {
      const sortOrder = options.sortOrder === 'desc' ? -1 : 1;
      contractors.sort((a, b) => {
        if (a[options.sortBy] < b[options.sortBy]) return -1 * sortOrder;
        if (a[options.sortBy] > b[options.sortBy]) return 1 * sortOrder;
        return 0;
      });
    }
    
    // Basic pagination
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedContractors = contractors.slice(startIndex, endIndex);
    
    return {
      data: paginatedContractors,
      pagination: {
        page,
        limit,
        total: contractors.length,
        totalPages: Math.ceil(contractors.length / limit),
        hasNextPage: endIndex < contractors.length,
        hasPrevPage: startIndex > 0
      }
    };
  }

  // Find contractor by ID
  async findById(id) {
    // Handle both string and number IDs
    const contractorId = typeof id === 'string' ? parseInt(id) : id;
    return this.repository.find(contractor => contractor.id === contractorId);
  }

  // Find contractor by email
  async findByEmail(email) {
    return this.repository.find(contractor => contractor.email === email);
  }

  // Find contractor by tax ID
  async findByTaxId(taxId) {
    return this.repository.find(contractor => contractor.taxId === taxId);
  }

  // Create new contractor
  async create(contractorData) {
    // Validate required fields
    const requiredFields = ['companyName', 'email', 'phone', 'contractorType'];
    for (const field of requiredFields) {
      if (!contractorData[field]) {
        throw new Error(`${field} is required`);
      }
    }
    
    // Check email uniqueness
    const emailExists = await this.findByEmail(contractorData.email);
    if (emailExists) {
      throw new Error('Email already exists');
    }
    
    // Generate ID
    const newId = this.repository.length > 0 
      ? Math.max(...this.repository.map(c => c.id)) + 1 
      : 1;
    
    const newContractor = {
      id: newId,
      isActive: true,
      rating: 0,
      totalJobs: 0,
      completedJobs: 0,
      ...contractorData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.repository.push(newContractor);
    return newContractor;
  }

  // Update contractor
  async update(id, updateData) {
    const contractorId = typeof id === 'string' ? parseInt(id) : id;
    const index = this.repository.findIndex(contractor => contractor.id === contractorId);
    
    if (index === -1) {
      throw new Error('Contractor not found');
    }
    
    // Check email uniqueness if email is being updated
    if (updateData.email && updateData.email !== this.repository[index].email) {
      const emailExists = await this.findByEmail(updateData.email);
      if (emailExists && emailExists.id !== contractorId) {
        throw new Error('Email already exists');
      }
    }
    
    // Check tax ID uniqueness if tax ID is being updated
    if (updateData.taxId && updateData.taxId !== this.repository[index].taxId) {
      const taxIdExists = await this.findByTaxId(updateData.taxId);
      if (taxIdExists && taxIdExists.id !== contractorId) {
        throw new Error('Tax ID already exists');
      }
    }
    
    // Update contractor
    this.repository[index] = {
      ...this.repository[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return this.repository[index];
  }

  // Delete contractor
  async delete(id) {
    const contractorId = typeof id === 'string' ? parseInt(id) : id;
    const index = this.repository.findIndex(contractor => contractor.id === contractorId);
    
    if (index === -1) {
      throw new Error('Contractor not found');
    }
    
    // Soft delete option - update status instead of removing
    if (this.repository[index].isActive) {
      throw new Error('Cannot delete active contractor. Deactivate first.');
    }
    
    // Remove contractor from array
    const deletedContractor = this.repository.splice(index, 1)[0];
    return deletedContractor;
  }

  // Count contractors by status
  async countByStatus() {
    const counts = {
      active: 0,
      inactive: 0,
      pending: 0,
      suspended: 0,
      total: this.repository.length
    };

    this.repository.forEach(contractor => {
      if (counts[contractor.status] !== undefined) {
        counts[contractor.status]++;
      }
    });

    return counts;
  }

  // Count contractors by type
  async countByType() {
    const counts = {};

    this.repository.forEach(contractor => {
      const type = contractor.contractorType || 'unknown';
      counts[type] = (counts[type] || 0) + 1;
    });

    return counts;
  }

  // Search contractors
  async search(query, options = {}) {
    if (!query) {
      return this.findAll(options);
    }
    
    const searchTerm = query.toLowerCase();
    const contractors = this.repository.filter(contractor => 
      contractor.companyName?.toLowerCase().includes(searchTerm) ||
      contractor.contactName?.toLowerCase().includes(searchTerm) ||
      contractor.email?.toLowerCase().includes(searchTerm) ||
      contractor.phone?.includes(searchTerm) ||
      contractor.taxId?.includes(searchTerm) ||
      contractor.address?.toLowerCase().includes(searchTerm) ||
      contractor.city?.toLowerCase().includes(searchTerm) ||
      contractor.state?.toLowerCase().includes(searchTerm) ||
      contractor.specialities?.some(speciality => 
        speciality.toLowerCase().includes(searchTerm)
      )
    );
    
    // Apply additional filters if provided
    let filteredContractors = [...contractors];
    
    if (options.status) {
      filteredContractors = filteredContractors.filter(
        contractor => contractor.status === options.status
      );
    }
    
    if (options.contractorType) {
      filteredContractors = filteredContractors.filter(
        contractor => contractor.contractorType === options.contractorType
      );
    }
    
    // Apply pagination if requested
    if (options.page || options.limit) {
      const page = parseInt(options.page) || 1;
      const limit = parseInt(options.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      return {
        data: filteredContractors.slice(startIndex, endIndex),
        total: filteredContractors.length,
        pagination: {
          page,
          limit,
          total: filteredContractors.length,
          totalPages: Math.ceil(filteredContractors.length / limit),
          hasNextPage: endIndex < filteredContractors.length,
          hasPrevPage: startIndex > 0
        }
      };
    }
    
    return {
      data: filteredContractors,
      total: filteredContractors.length
    };
  }

  // Deactivate contractor
  async deactivate(id) {
    const contractorId = typeof id === 'string' ? parseInt(id) : id;
    const index = this.repository.findIndex(contractor => contractor.id === contractorId);
    
    if (index === -1) {
      throw new Error('Contractor not found');
    }
    
    this.repository[index] = {
      ...this.repository[index],
      isActive: false,
      status: 'inactive',
      updatedAt: new Date().toISOString()
    };
    
    return this.repository[index];
  }

  // Activate contractor
  async activate(id) {
    const contractorId = typeof id === 'string' ? parseInt(id) : id;
    const index = this.repository.findIndex(contractor => contractor.id === contractorId);
    
    if (index === -1) {
      throw new Error('Contractor not found');
    }
    
    this.repository[index] = {
      ...this.repository[index],
      isActive: true,
      status: 'active',
      updatedAt: new Date().toISOString()
    };
    
    return this.repository[index];
  }

  // Update contractor rating
  async updateRating(id, newRating) {
    const contractorId = typeof id === 'string' ? parseInt(id) : id;
    const index = this.repository.findIndex(contractor => contractor.id === contractorId);
    
    if (index === -1) {
      throw new Error('Contractor not found');
    }
    
    if (newRating < 0 || newRating > 5) {
      throw new Error('Rating must be between 0 and 5');
    }
    
    this.repository[index] = {
      ...this.repository[index],
      rating: newRating,
      updatedAt: new Date().toISOString()
    };
    
    return this.repository[index];
  }

  // Add job to contractor
  async addJob(id, jobCompleted = false) {
    const contractorId = typeof id === 'string' ? parseInt(id) : id;
    const index = this.repository.findIndex(contractor => contractor.id === contractorId);
    
    if (index === -1) {
      throw new Error('Contractor not found');
    }
    
    this.repository[index] = {
      ...this.repository[index],
      totalJobs: (this.repository[index].totalJobs || 0) + 1,
      completedJobs: (this.repository[index].completedJobs || 0) + (jobCompleted ? 1 : 0),
      updatedAt: new Date().toISOString()
    };
    
    return this.repository[index];
  }

  // Get contractor statistics
  async getStats() {
    const totalContractors = this.repository.length;
    const activeContractors = this.repository.filter(c => c.isActive).length;
    const averageRating = this.repository.length > 0
      ? this.repository.reduce((sum, c) => sum + (c.rating || 0), 0) / this.repository.length
      : 0;
    const totalJobs = this.repository.reduce((sum, c) => sum + (c.totalJobs || 0), 0);
    const completedJobs = this.repository.reduce((sum, c) => sum + (c.completedJobs || 0), 0);
    
    return {
      totalContractors,
      activeContractors,
      inactiveContractors: totalContractors - activeContractors,
      averageRating: parseFloat(averageRating.toFixed(2)),
      totalJobs,
      completedJobs,
      completionRate: totalJobs > 0 ? parseFloat(((completedJobs / totalJobs) * 100).toFixed(2)) : 0
    };
  }
}

module.exports = ContractorService;