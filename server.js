const express = require('express');
const cors = require('cors');
require('dotenv').config();
const customerRoutes = require("./Routes/customer");  // Import your router
const workerRoutes = require("./Routes/contractor")

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - These should come BEFORE route definitions
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Mount customer routes with base path
app.use('/api/customers', customerRoutes);
app.use('/api/contractors', workerRoutes); 
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Customer API',
    version: '1.0.0'
  });
});

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Contractor Management API',
    endpoints: {
      customers: {
        getAll: 'GET /api/customers',
        getById: 'GET /api/customers/:id',
        search: 'GET /api/customers/search?q=term',
        create: 'POST /api/customers',
        update: 'PUT /api/customers/:id',
        delete: 'DELETE /api/customers/:id'
      },
      contractors: {
        getAll: 'GET /api/contractors',
        getById: 'GET /api/contractors/:id',
        search: 'GET /api/contractors/search?q=term',
        filter: 'GET /api/contractors/filter?status=active&type=individual',
        create: 'POST /api/contractors',
        update: 'PUT /api/contractors/:id',
        delete: 'DELETE /api/contractors/:id',
        stats: 'GET /api/contractors/stats',
        deactivate: 'PATCH /api/contractors/:id/deactivate',
        activate: 'PATCH /api/contractors/:id/activate'
      },
      health: 'GET /health'
    }
  });
});

// Global error handler - This should be LAST
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  🚀 Contractor Management API Server Started!
  ============================================
  📍 Environment: ${process.env.NODE_ENV || 'development'}
  🌐 Port: ${PORT}
  🔗 Local: http://localhost:${PORT}
  📊 API Base: http://localhost:${PORT}/
  
  📋 Available Endpoints:
  ----------------------
  CUSTOMERS:
  GET    /api/customers           - Get all customers
  GET    /api/customers/search    - Search customers (?q=term)
  GET    /api/customers/:id       - Get customer by ID
  POST   /api/customers           - Create new customer
  PUT    /api/customers/:id       - Update customer
  DELETE /api/customers/:id       - Delete customer
  
  CONTRACTORS:
  GET    /api/contractors         - Get all contractors
  GET    /api/contractors/search  - Search contractors (?q=term)
  GET    /api/contractors/filter  - Filter contractors (?status=active)
  GET    /api/contractors/:id     - Get contractor by ID
  POST   /api/contractors         - Create new contractor
  PUT    /api/contractors/:id     - Update contractor
  DELETE /api/contractors/:id     - Delete contractor
  GET    /api/contractors/stats   - Get contractor statistics
  PATCH  /api/contractors/:id/deactivate - Deactivate contractor
  PATCH  /api/contractors/:id/activate   - Activate contractor
  
  SYSTEM:
  GET    /health                  - Health check
  `);
});