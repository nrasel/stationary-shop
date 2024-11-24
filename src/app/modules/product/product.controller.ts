/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { productService } from './product.service';

// create product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await productService.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      message: { err, stack: err.stack },
    });
  }
};

//get all product controller
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { brand: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      : {};
    const result = await productService.getAllProductsFromDB(query);

    if (result.length === 0) {
      throw new Error('Product not found');
    }

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Product not found',
    });
  }
};

//get single product controller
const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const result = await productService.getSingleProductsFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Product not found!',
    });
  }
};

//update product successful
const updateProducts = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const data = req.body;

    const result = await productService.updateProduct(productId, data);

    res.status(200).json({
      success: true,
      message: 'Products updated successfully',
      data: result,
    });
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Product not found or invalid ID',
    });
  }
};

//delete product successful
const deleteProducts = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    await productService.deleteProduct(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {},
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Product not found',
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateProducts,
  deleteProducts,
};
