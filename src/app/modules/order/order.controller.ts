import { Request, Response } from 'express';
import { Product } from '../product/product.model';
import { Order } from './order.model';
import { orderService } from './order.service';

// create product controller
const orderCreate = async (req: Request, res: Response) => {
  try {
    const { email, product: productId, quantity, totalPrice } = req.body;

    // const result = await orderService.createOrderIntoDB(order);

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.quantity < quantity) {
      throw new Error('Insufficient stock.');
    }

    const order = new Order({
      email,
      product: productId,
      quantity,
      totalPrice,
    });

    await order.save();

    product.quantity -= quantity;
    if (product.quantity === 0) {
      product.inStock = false;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get order this is an extra feature for somekind of testing purpose
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
      message: err.message || 'Something went wrong!',
    });
  }
};

export const orderController = {
  orderCreate,
  getOrder,
};
