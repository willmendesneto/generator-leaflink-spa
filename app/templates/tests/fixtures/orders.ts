import { faker } from '@faker-js/faker';

import { Order, OrderStatus, TransportType } from '@/models/orders';

export const generateOrder = (): Order => {
  const orderType = faker.helpers.arrayElement<TransportType>(['PICKUP', 'DELIVERY']);

  return {
    number: faker.string.uuid().slice(0, 8),
    scheduled_time: faker.date.soon().toISOString(),
    status: faker.helpers.arrayElement<OrderStatus>(['assigned', 'planned', 'shipped', 'delivered']),
    customer: {
      name: faker.company.name(),
      address: {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        zipcode: faker.location.zipCode(),
        transport_settings: {
          transport_type: orderType,
        },
      },
    },
    pickup_address: {
      name: faker.company.name(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipcode: faker.location.zipCode(),
      transport_settings: {
        transport_type: orderType,
      },
    },
    payment_expected: {
      currency: faker.finance.currencyCode(),
      amount: Number.parseFloat(faker.finance.amount({ dec: 2, min: 5000, max: 10000 })),
    },
    eligible_payment_methods: ['ACH', 'Net 7', 'Others'],
    customer_notes: faker.helpers.arrayElement(['', faker.lorem.sentence()]),
    destination: {
      name: faker.company.name(),
      delivery_address: {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        zipcode: faker.location.zipCode(),
      },
    },
    payment_method: [{ id: 4, method: 'ACH' }],

    // Fields to be added during Confirmation process (Pickup/Delivery)
    notes: null,
    collected_payment_amount: null,
    payment_method_collected: null,
    actual_delivery_datetime: null,
    actual_pickup_datetime: null,
  };
};

export const generateConfirmedPickupOrderDetails = (order = generateOrder()) => {
  order.customer.address.transport_settings.transport_type = 'PICKUP';
  order.actual_pickup_datetime = faker.date.soon().toISOString();
  return order;
};
