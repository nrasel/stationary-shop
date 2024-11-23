"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
// create product controller
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const result = yield product_service_1.productService.createProductIntoDB(product);
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        console.log(err.stack);
        res.status(500).json({
            success: false,
            message: { err, stack: err.stack },
        });
    }
});
//get all product controller
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query = searchTerm
            ? {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { brand: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                ],
            }
            : {};
        const result = yield product_service_1.productService.getAllProductsFromDB(query);
        if (result.length === 0) {
            throw new Error('Product not found');
        }
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Product not found',
        });
    }
});
//get single product controller
const getSingleProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.productService.getSingleProductsFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Product not found!',
        });
    }
});
//update product successful
const updateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const data = req.body;
        const result = yield product_service_1.productService.updateProduct(productId, data);
        res.status(200).json({
            success: true,
            message: 'Products updated successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Product not found or invalid ID',
        });
    }
});
//delete product successful
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield product_service_1.productService.deleteProduct(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: {},
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Product not found',
        });
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getSingleProducts,
    updateProducts,
    deleteProducts,
};
