import { Request, Response } from 'express';
import { orderService } from './order.service';

// create product controller
const orderCreate = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await orderService.createOrderIntoDB(order);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err || 'Something went wrong!',
    });
  }
};

// get order
const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getOrderFromDB();

    res.status(200).json({
      success: true,
      message: 'Order retrieved  successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err || 'Something went wrong!',
    });
  }
};

export const orderController = {
  orderCreate,
  getOrder,
};
