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
exports.revenueService = void 0;
const order_model_1 = require("../order/order.model");
// create product service
const revenueCalculateFromOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    //Aggregation pipeline
    const revenue = yield order_model_1.Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
    ]);
    //check the order is exist or not, if no order exist then revenue return 0
    const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;
    return totalRevenue;
});
exports.revenueService = {
    revenueCalculateFromOrder,
};
