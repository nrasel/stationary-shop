import { Order } from '../order/order.model';

// create product service
const revenueCalculateFromOrder = async () => {
  //Aggregation pipeline
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  //check the order is exist or not, if no order exist then revenue return 0
  const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;

  return totalRevenue;
};

export const revenueService = {
  revenueCalculateFromOrder,
};
