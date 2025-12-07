// Sample customer data with 25 entries
const customers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, New York, NY',
    status: 'active',
    createdAt: '2024-01-01T10:30:00.000Z',
    updatedAt: '2024-01-01T10:30:00.000Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    address: '456 Oak Ave, Los Angeles, CA',
    status: 'active',
    createdAt: '2024-01-02T14:15:00.000Z',
    updatedAt: '2024-01-02T14:15:00.000Z'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    phone: '555-123-4567',
    address: '789 Pine Rd, Chicago, IL',
    status: 'inactive',
    createdAt: '2024-01-03T09:45:00.000Z',
    updatedAt: '2024-01-10T16:20:00.000Z'
  },
  {
    id: 4,
    name: 'Emily Williams',
    email: 'emily.w@example.com',
    phone: '444-555-6666',
    address: '321 Elm St, Houston, TX',
    status: 'active',
    createdAt: '2024-01-04T11:20:00.000Z',
    updatedAt: '2024-01-04T11:20:00.000Z'
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '777-888-9999',
    address: '654 Maple Ave, Phoenix, AZ',
    status: 'pending',
    createdAt: '2024-01-05T13:10:00.000Z',
    updatedAt: '2024-01-05T13:10:00.000Z'
  },
  {
    id: 6,
    name: 'Sarah Davis',
    email: 'sarah.d@example.com',
    phone: '222-333-4444',
    address: '987 Cedar Ln, Philadelphia, PA',
    status: 'active',
    createdAt: '2024-01-06T08:45:00.000Z',
    updatedAt: '2024-01-15T12:30:00.000Z'
  },
  {
    id: 7,
    name: 'David Miller',
    email: 'david.m@example.com',
    phone: '666-777-8888',
    address: '147 Birch St, San Antonio, TX',
    status: 'active',
    createdAt: '2024-01-07T15:25:00.000Z',
    updatedAt: '2024-01-07T15:25:00.000Z'
  },
  {
    id: 8,
    name: 'Jennifer Wilson',
    email: 'jennifer.w@example.com',
    phone: '111-222-3333',
    address: '258 Walnut Ave, San Diego, CA',
    status: 'inactive',
    createdAt: '2024-01-08T10:10:00.000Z',
    updatedAt: '2024-01-20T14:45:00.000Z'
  },
  {
    id: 9,
    name: 'Christopher Moore',
    email: 'chris.m@example.com',
    phone: '999-000-1111',
    address: '369 Spruce Dr, Dallas, TX',
    status: 'active',
    createdAt: '2024-01-09T12:35:00.000Z',
    updatedAt: '2024-01-09T12:35:00.000Z'
  },
  {
    id: 10,
    name: 'Lisa Taylor',
    email: 'lisa.t@example.com',
    phone: '333-444-5555',
    address: '741 Poplar Blvd, San Jose, CA',
    status: 'pending',
    createdAt: '2024-01-10T09:15:00.000Z',
    updatedAt: '2024-01-10T09:15:00.000Z'
  },
  {
    id: 11,
    name: 'Daniel Anderson',
    email: 'daniel.a@example.com',
    phone: '888-999-0000',
    address: '852 Redwood Ct, Austin, TX',
    status: 'active',
    createdAt: '2024-01-11T16:40:00.000Z',
    updatedAt: '2024-01-25T11:20:00.000Z'
  },
  {
    id: 12,
    name: 'Amanda Thomas',
    email: 'amanda.t@example.com',
    phone: '444-666-8888',
    address: '963 Willow Way, Jacksonville, FL',
    status: 'active',
    createdAt: '2024-01-12T14:05:00.000Z',
    updatedAt: '2024-01-12T14:05:00.000Z'
  },
  {
    id: 13,
    name: 'James Jackson',
    email: 'james.j@example.com',
    phone: '555-777-9999',
    address: '159 Ash St, Fort Worth, TX',
    status: 'inactive',
    createdAt: '2024-01-13T11:50:00.000Z',
    updatedAt: '2024-01-28T13:15:00.000Z'
  },
  {
    id: 14,
    name: 'Jessica White',
    email: 'jessica.w@example.com',
    phone: '222-444-6666',
    address: '753 Magnolia Ave, Columbus, OH',
    status: 'active',
    createdAt: '2024-01-14T10:25:00.000Z',
    updatedAt: '2024-01-14T10:25:00.000Z'
  },
  {
    id: 15,
    name: 'Matthew Harris',
    email: 'matt.h@example.com',
    phone: '777-111-3333',
    address: '951 Sycamore Ln, Charlotte, NC',
    status: 'active',
    createdAt: '2024-01-15T13:30:00.000Z',
    updatedAt: '2024-02-01T09:45:00.000Z'
  },
  {
    id: 16,
    name: 'Ashley Martin',
    email: 'ashley.m@example.com',
    phone: '111-333-5555',
    address: '357 Chestnut Rd, Indianapolis, IN',
    status: 'pending',
    createdAt: '2024-01-16T08:55:00.000Z',
    updatedAt: '2024-01-16T08:55:00.000Z'
  },
  {
    id: 17,
    name: 'Joshua Thompson',
    email: 'josh.t@example.com',
    phone: '999-222-4444',
    address: '486 Palm St, San Francisco, CA',
    status: 'active',
    createdAt: '2024-01-17T15:15:00.000Z',
    updatedAt: '2024-01-17T15:15:00.000Z'
  },
  {
    id: 18,
    name: 'Samantha Garcia',
    email: 'samantha.g@example.com',
    phone: '666-888-0000',
    address: '624 Cypress Ave, Seattle, WA',
    status: 'active',
    createdAt: '2024-01-18T12:40:00.000Z',
    updatedAt: '2024-02-05T14:20:00.000Z'
  },
  {
    id: 19,
    name: 'Andrew Martinez',
    email: 'andrew.m@example.com',
    phone: '333-555-7777',
    address: '759 Sequoia Dr, Denver, CO',
    status: 'inactive',
    createdAt: '2024-01-19T09:20:00.000Z',
    updatedAt: '2024-02-10T10:30:00.000Z'
  },
  {
    id: 20,
    name: 'Megan Robinson',
    email: 'megan.r@example.com',
    phone: '888-000-2222',
    address: '852 Fir St, Washington, DC',
    status: 'active',
    createdAt: '2024-01-20T16:05:00.000Z',
    updatedAt: '2024-01-20T16:05:00.000Z'
  },
  {
    id: 21,
    name: 'Kevin Clark',
    email: 'kevin.c@example.com',
    phone: '444-222-6666',
    address: '147 Hemlock Way, Boston, MA',
    status: 'active',
    createdAt: '2024-01-21T14:30:00.000Z',
    updatedAt: '2024-02-15T12:45:00.000Z'
  },
  {
    id: 22,
    name: 'Nicole Rodriguez',
    email: 'nicole.r@example.com',
    phone: '777-333-9999',
    address: '258 Juniper Blvd, Nashville, TN',
    status: 'pending',
    createdAt: '2024-01-22T11:10:00.000Z',
    updatedAt: '2024-01-22T11:10:00.000Z'
  },
  {
    id: 23,
    name: 'Brian Lewis',
    email: 'brian.l@example.com',
    phone: '222-888-4444',
    address: '369 Locust St, Baltimore, MD',
    status: 'active',
    createdAt: '2024-01-23T10:45:00.000Z',
    updatedAt: '2024-01-23T10:45:00.000Z'
  },
  {
    id: 24,
    name: 'Stephanie Lee',
    email: 'stephanie.l@example.com',
    phone: '555-000-1111',
    address: '741 Hickory Ave, Oklahoma City, OK',
    status: 'active',
    createdAt: '2024-01-24T13:20:00.000Z',
    updatedAt: '2024-02-20T15:10:00.000Z'
  },
  {
    id: 25,
    name: 'Jonathan Walker',
    email: 'jonathan.w@example.com',
    phone: '999-444-8888',
    address: '852 Alder Ct, Louisville, KY',
    status: 'inactive',
    createdAt: '2024-01-25T08:35:00.000Z',
    updatedAt: '2024-02-25T09:25:00.000Z'
  }
];

module.exports = customers;