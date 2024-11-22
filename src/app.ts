import cors from 'cors';
import express, { Request, Response } from 'express';
import { productRoutes } from './app/modules/product/product.routes';
import { orderRoutes } from './app/modules/order/order.routes';
import { revenueRoutes } from './app/modules/revenue/revenue.routes';
const app = express();

// parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orders/revenue', revenueRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
