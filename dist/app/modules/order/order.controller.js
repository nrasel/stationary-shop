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
exports.orderController = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const order_service_1 = require("./order.service");
// create product controller
const orderCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, product: productId, quantity, totalPrice } = req.body;
        // const result = await orderService.createOrderIntoDB(order);
        const product = yield product_model_1.Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        if (product.quantity < quantity) {
            throw new Error('Insufficient stock.');
        }
        const order = new order_model_1.Order({
            email,
            product: productId,
            quantity,
            totalPrice,
        });
        yield order.save();
        product.quantity -= quantity;
        if (product.quantity === 0) {
            product.inStock = false;
        }
        yield product.save();
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: order,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
// get order this is an extra feature for somekind of testing purpose
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.getOrderFromDB();
        res.status(200).json({
            success: true,
            message: 'Order retrieved  successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong!',
        });
    }
});
exports.orderController = {
    orderCreate,
    getOrder,
};
