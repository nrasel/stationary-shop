import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getSingleProducts);
router.put('/:productId', productController.updateProducts);
router.delete('/:productId', productController.deleteProducts);

export const productRoutes = router;
