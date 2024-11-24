import { TProducts } from './product.interface';
import { Product } from './product.model';

// create product service
const createProductIntoDB = async (productData: TProducts) => {
  const result = await Product.create(productData);

  return result;
};

//get all products service
const getAllProductsFromDB = async (data: TProducts) => {
  const result = await Product.find(data);
  return result;
};

//get single products service
const getSingleProductsFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  // console.log(result);
  return result;
};
//update products
const updateProduct = async (productId: string, data: TProducts) => {
  const result = await Product.findByIdAndUpdate(productId, data, {
    new: true,
    runValidators: true,
  });
  return result;
};
//delete products
const deleteProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId, { new: true });
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductsFromDB,
  updateProduct,
  deleteProduct,
};
