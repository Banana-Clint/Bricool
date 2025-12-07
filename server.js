const express = require('express');
const cors = require('cors');
require('dotenv').config();
const customerRoutes = require("./Routes/customer");  // Import your router

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
app.use('/api/customers', customerRoutes);  // Fixed mount path

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
    message: 'Welcome to Customer API',
    endpoints: {
      customers: {
        getAll: 'GET /api/customers',
        getById: 'GET /api/customers/:id',
        search: 'GET /api/customers/search?q=term',
        create: 'POST /api/customers',
        update: 'PUT /api/customers/:id',
        delete: 'DELETE /api/customers/:id'
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
  🚀 Customer API Server Started!
  =================================
  📍 Environment: ${process.env.NODE_ENV || 'development'}
  🌐 Port: ${PORT}
  🔗 Local: http://localhost:${PORT}
  📊 API Base: http://localhost:${PORT}/api/customers
  ✅ Health: http://localhost:${PORT}/health
  
  📋 Available Endpoints:
  ----------------------
  GET    /api/customers           - Get all customers
  GET    /api/customers/search    - Search customers (?q=term)
  GET    /api/customers/:id       - Get customer by ID
  POST   /api/customers           - Create new customer
  PUT    /api/customers/:id       - Update customer
  DELETE /api/customers/:id       - Delete customer
  GET    /health                  - Health check
  `);
});