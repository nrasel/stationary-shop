// import { TOrder } from './order.interface';
import { Order } from './order.model';


// get order
const getOrderFromDB = async () => {
  const result = await Order.find();

  console.log(result);
  return result;
};

export const orderService = {
  getOrderFromDB,
};
