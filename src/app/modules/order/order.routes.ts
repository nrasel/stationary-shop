import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

router.post('/', orderController.orderCreate);
router.get('/', orderController.getOrder);

export const orderRoutes = router;
