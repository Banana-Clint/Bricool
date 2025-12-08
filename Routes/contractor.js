const express = require('express');
const router = express.Router();
const {
  getAllContractors,
  getContractorById,
  createContractor,
  updateContractor,
  deleteContractor,
  searchContractors,
  filterContractors,
  getContractorStats,
  getContractorsByStatus,
  getContractorsByType,
  deactivateContractor,
  activateContractor,
  updateContractorRating,
  addJobToContractor,
  bulkUpdateContractors,
  bulkDeactivateContractors
} = require('../Endpoints/contractor');

// Define API endpoints - similar structure to customer router
router.get('/', getAllContractors);
router.get('/search', searchContractors);
router.get('/filter', filterContractors);
router.get('/stats', getContractorStats);
router.get('/status-count', getContractorsByStatus);
router.get('/type-count', getContractorsByType);
router.get('/:id', getContractorById);
router.post('/', createContractor);
router.put('/:id', updateContractor);
router.delete('/:id', deleteContractor);
router.patch('/:id/deactivate', deactivateContractor);
router.patch('/:id/activate', activateContractor);
router.patch('/:id/rating', updateContractorRating);
router.patch('/:id/add-job', addJobToContractor);
router.post('/bulk/update', bulkUpdateContractors);
router.post('/bulk/deactivate', bulkDeactivateContractors);

module.exports = router;