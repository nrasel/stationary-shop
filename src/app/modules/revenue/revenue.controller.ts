import { Request, Response } from 'express';
import { revenueService } from './revenue.service';

// create product controller
const reveneueCalculate = async (req: Request, res: Response) => {
  try {
    const result = await revenueService.revenueCalculateFromOrder();

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: { totalRevenue: result },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
    });
  }
};

export const revenuecontroller = {
  reveneueCalculate,
};
