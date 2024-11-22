import { TOrder } from './order.interface';
import { Order } from './order.model';

// create order from db
const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);

  return result;
};
// get order
const getOrderFromDB = async () => {
  const result = await Order.find();

  console.log(result);
  return result;
};

export const orderService = {
  createOrderIntoDB,
  getOrderFromDB,
};
