import express from 'express';
import { revenuecontroller } from './revenue.controller';

const router = express.Router();

router.get('/', revenuecontroller.reveneueCalculate);

export const revenueRoutes = router;
