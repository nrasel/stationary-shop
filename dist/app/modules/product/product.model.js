"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true,
    },
    brand: {
        type: String,
        required: [true, 'Brand name is required.'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number.'],
    },
    category: {
        type: String,
        enum: {
            values: [
                'Writing',
                'Office Supplies',
                'Art Supplies',
                'Educational',
                'Technology',
            ],
            message: 'Category must be one of the following: Writing, Office Supplies,Art Supplies,Educational,Technology.',
        },
        required: [true, 'Category is required.'],
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
        min: [0, 'Quantity must be a positive number or zero.'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'In-stock status is required.'],
    },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
