import mongoose, { model, Schema } from 'mongoose';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Customer emaili is required'],
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: 'Provide a valid email.',
      },
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Product ID is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [1, 'Quantity must be at least 1.'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total Price is required.'],
      min: [0, 'Total price must be a positive value'],
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.pre('save', async function (next) {
  if (!this.isModified('quantity')) {
    return next();
  }
  try {
    const product = await Product.findById(this.product);

    if (!product) {
      throw new Error('Product not found.');
    }

    if (product.quantity < this.quantity) {
      throw new Error('Insufficient stock.');
    }

    product.quantity -= this.quantity;
    if (product.quantity === 0) {
      product.inStock = false;
    }

    await product.save();
    this.totalPrice = this.quantity * product.price;
    next();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }

  next();
});

export const Order = model<TOrder>('Order', orderSchema);
