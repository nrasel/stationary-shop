import mongoose from 'mongoose';

export type TOrder = {
  email: string;
  product: mongoose.Types.ObjectId | null;
  quantity: number;
  totalPrice: number;
};
