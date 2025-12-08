/**
 * Contractor model for managing service providers
 */
class Contractor {
  static create(data) {
    return {
      id: data.id,
      // Basic Information
      companyName: data.companyName,
      contactPerson: data.contactPerson,
      email: data.email,
      phone: data.phone,
      // Business Details
      businessNumber: data.businessNumber || null, // VAT, GST, or business registration number
      businessType: data.businessType || 'sole-proprietor', // 'sole-proprietor', 'llc', 'corporation', 'partnership'
      industry: data.industry || 'general', // e.g., 'construction', 'it', 'consulting', 'maintenance'
      // Location Information
      address: data.address || null,
      serviceAreas: data.serviceAreas || [], // Array of areas/zones they service
      // Status and Ratings
      status: data.status || 'pending', // 'pending', 'active', 'suspended', 'inactive'
      rating: data.rating || null, // Average rating 1-5
      totalJobs: data.totalJobs || 0,
      completedJobs: data.completedJobs || 0,
      // Financial Information
      paymentTerms: data.paymentTerms || 'net-30', // 'net-15', 'net-30', 'net-60'
      hourlyRate: data.hourlyRate || null,
      projectRate: data.projectRate || null,
      currency: data.currency || 'USD',
      // Insurance and Certifications
      insuranceExpiry: data.insuranceExpiry || null,
      certifications: data.certifications || [], // Array of certification objects
      // Contact Preferences
      preferredContactMethod: data.preferredContactMethod || 'email', // 'email', 'phone', 'sms'
      availability: data.availability || 'business-hours', // '24/7', 'business-hours', 'weekends'
      // Additional Details
      website: data.website || null,
      description: data.description || null,
      tags: data.tags || [], // e.g., ['plumbing', 'emergency', 'licensed']
      // Metadata
      notes: data.notes || null, // Internal notes
      referralSource: data.referralSource || null,
      // Timestamps
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
      lastActiveAt: data.lastActiveAt || null,
      contractStartDate: data.contractStartDate || null,
      contractEndDate: data.contractEndDate || null
    };
  }
  
  // Optional: Add validation method
  static validate(data) {
    const requiredFields = ['companyName', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    if (data.email && !this.isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }
    
    return true;
  }
  
  // Optional: Helper method for email validation
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Optional: Update method
  static update(existingContractor, updates) {
    return {
      ...existingContractor,
      ...updates,
      updatedAt: new Date().toISOString()
    };
  }
  
  // Optional: Status change method
  static changeStatus(contractor, newStatus) {
    const allowedStatuses = ['pending', 'active', 'suspended', 'inactive'];
    
    if (!allowedStatuses.includes(newStatus)) {
      throw new Error(`Invalid status. Allowed: ${allowedStatuses.join(', ')}`);
    }
    
    return this.update(contractor, { status: newStatus });
  }
}

module.exports = Contractor;