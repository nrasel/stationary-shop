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
exports.revenuecontroller = void 0;
const revenue_service_1 = require("./revenue.service");
// create product controller
const reveneueCalculate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield revenue_service_1.revenueService.revenueCalculateFromOrder();
        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: { totalRevenue: result },
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
exports.revenuecontroller = {
    reveneueCalculate,
};
