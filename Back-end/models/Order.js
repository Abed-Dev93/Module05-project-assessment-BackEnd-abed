import mongoose from "mongoose"

const Schema = mongoose.Schema

const order = new Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
        productTitle: {
            type: String,
            required: true
        },
        productDescription: {
            type: String,
            required: true
        }
    }],
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    unitPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model("Order", order)