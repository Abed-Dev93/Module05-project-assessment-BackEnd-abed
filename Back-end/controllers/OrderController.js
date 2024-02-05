import Order from "../models/Order.js"
import Product from '../models/Product.js'
import User from '../models/User.js'

const orderController = {
    createOrder: async (req, res) => {
        const userId = req.params.userId
        const { products, quantity, unitPrice, totalPrice } = req.body
        try {
            const newOrder = await Order.create({
                products,
                quantity,
                unitPrice,
                totalPrice,
                userId: userId
            })
            await newOrder.save()
            newOrder ? res.status(200).json({ message: 'Your Order has been created successfuly!', Order: newOrder })
             : res.status(400).send('Error Occured!')
        }
        catch (error) {
            return res.status(404).json({ message: error.message })
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find()
            return res.status(200).json({ Orders: orders })
        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
        }
    },
    getOrderById: async (req, res) => {
        const id = req.params.id
        try {
            const order = await Order.findById(id)
            order ? res.status(200).json({ Order: order })
                : res.status(404).send(`Order with ID ${id} is not found!`)
        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
        }
    },
    getOrdersByUser: async (req, res) => {
        const userId = req.body.userId
        try {
            const orders = await Order.find({ userId: userId })
            orders ? res.status(200).json({ Orders: orders }) :
                res.status(404).send(`Invalid UserID ${userId}!`)
        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
        }
    },
    updateOrder: async (req, res) => {
        const id = req.params.id
        const status = req.body.status
        try {
            const editOrder = await Order.findByIdAndUpdate(id, {
                status
            })
            editOrder ? res.status(200).json({ message: "Your Order has been successfully updated" })
                : res.status(400).send(`Error occurred or Order with ID ${id} is not found!`)
        } catch (error) {
            return res.status(404).json({ message: error.message })
        }
    },
}

export default orderController