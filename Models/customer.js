/**
 * Simple customer model
 */
class Customer {
  static create(data) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      status: data.status || 'active',
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString()
    };
  }
}

module.exports = Customer;