const ContractorService = require('../Services/contractorService');
const repository = require('../Utils/WorkerSamples');
const contractorService = new ContractorService(repository);

const getAllContractors = async (req, res) => {
  try {
    // Use the service to get all contractors with optional filters
    const result = await contractorService.findAll(req.query);
    
    res.json({
      success: true,
      count: result.data.length,
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

const getContractorById = async (req, res) => {
  try {
    // Use the service to find contractor by ID
    const contractor = await contractorService.findById(req.params.id);
    
    if (!contractor) {
      return res.status(404).json({ 
        success: false,
        error: 'Contractor not found' 
      });
    }
    
    res.json({
      success: true,
      data: contractor
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

const createContractor = async (req, res) => {
  try {
    // Use the service to create a new contractor
    const contractor = await contractorService.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Contractor created successfully',
      data: contractor
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
};

const updateContractor = async (req, res) => {
  try {
    // Use the service to update contractor
    const updatedContractor = await contractorService.update(req.params.id, req.body);
    
    res.json({
      success: true,
      message: 'Contractor updated successfully',
      data: updatedContractor
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: error.message 
    });
  }
};

const deleteContractor = async (req, res) => {
  try {
    // Use the service to delete contractor
    await contractorService.delete(req.params.id);
    
    res.json({
      success: true,
      message: 'Contractor deleted successfully'
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: error.message 
    });
  }
};

const searchContractors = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    // Use the service to search contractors
    const result = await contractorService.search(q, req.query);
    
    res.json({
      success: true,
      count: result.total,
      data: result.data,
      pagination: result.pagination || undefined
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

const filterContractors = async (req, res) => {
  try {
    const result = await contractorService.findAll(req.query);
    
    res.json({
      success: true,
      count: result.data.length,
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// NEW ENDPOINTS FOR ADDITIONAL FUNCTIONALITY

const deactivateContractor = async (req, res) => {
  try {
    const contractor = await contractorService.deactivate(req.params.id);
    
    res.json({
      success: true,
      message: 'Contractor deactivated successfully',
      data: contractor
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: error.message 
    });
  }
};

const activateContractor = async (req, res) => {
  try {
    const contractor = await contractorService.activate(req.params.id);
    
    res.json({
      success: true,
      message: 'Contractor activated successfully',
      data: contractor
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: error.message 
    });
  }
};

const updateContractorRating = async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (rating === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Rating is required'
      });
    }
    
    const contractor = await contractorService.updateRating(req.params.id, rating);
    
    res.json({
      success: true,
      message: 'Contractor rating updated successfully',
      data: contractor
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: error.message 
    });
  }
};

const addJobToContractor = async (req, res) => {
  try {
    const { jobCompleted = false } = req.body;
    const contractor = await contractorService.addJob(req.params.id, jobCompleted);
    
    res.json({
      success: true,
      message: `Job added to contractor${jobCompleted ? ' (completed)' : ''}`,
      data: contractor
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: error.message 
    });
  }
};

const getContractorStats = async (req, res) => {
  try {
    const stats = await contractorService.getStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

const getContractorsByStatus = async (req, res) => {
  try {
    const counts = await contractorService.countByStatus();
    
    res.json({
      success: true,
      data: counts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

const getContractorsByType = async (req, res) => {
  try {
    const counts = await contractorService.countByType();
    
    res.json({
      success: true,
      data: counts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// BULK OPERATIONS

const bulkUpdateContractors = async (req, res) => {
  try {
    const { ids, updates } = req.body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Array of contractor IDs is required'
      });
    }
    
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Updates object is required'
      });
    }
    
    const results = [];
    const errors = [];
    
    for (const id of ids) {
      try {
        const updatedContractor = await contractorService.update(id, updates);
        results.push({
          id,
          success: true,
          data: updatedContractor
        });
      } catch (error) {
        errors.push({
          id,
          success: false,
          error: error.message
        });
      }
    }
    
    res.json({
      success: true,
      message: `Bulk update completed: ${results.length} successful, ${errors.length} failed`,
      results,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

const bulkDeactivateContractors = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Array of contractor IDs is required'
      });
    }
    
    const results = [];
    const errors = [];
    
    for (const id of ids) {
      try {
        const contractor = await contractorService.deactivate(id);
        results.push({
          id,
          success: true,
          data: contractor
        });
      } catch (error) {
        errors.push({
          id,
          success: false,
          error: error.message
        });
      }
    }
    
    res.json({
      success: true,
      message: `Bulk deactivation completed: ${results.length} successful, ${errors.length} failed`,
      results,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

module.exports = {
  // Core CRUD operations
  getAllContractors,
  getContractorById,
  createContractor,
  updateContractor,
  deleteContractor,
  searchContractors,
  filterContractors,
  
  // New enhanced operations
  deactivateContractor,
  activateContractor,
  updateContractorRating,
  addJobToContractor,
  getContractorStats,
  getContractorsByStatus,
  getContractorsByType,
  
  // Bulk operations
  bulkUpdateContractors,
  bulkDeactivateContractors
};