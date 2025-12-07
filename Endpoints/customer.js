const CustomerService = require('../Services/customerService');
const repository = require('../Utils/CustomerSamples');

const customerService = new CustomerService(repository);

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const result = await customerService.findAll(req.query);
    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Search customers
const searchCustomers = async (req, res) => {
  try {
    const result = await customerService.search(req.query.q);
    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Get single customer
const getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Create customer
const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: customer
    });
  } catch (error) {
    if (error.message === 'Email already exists') {
      return res.status(409).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  try {
    const customer = await customerService.update(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      data: customer
    });
  } catch (error) {
    if (error.message === 'Customer not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    
    if (error.message === 'Email already exists') {
      return res.status(409).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await customerService.delete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Customer deleted successfully',
      data: customer
    });
  } catch (error) {
    if (error.message === 'Customer not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomers
};