import express from 'express'
import orderController from '../controllers/OrderController.js'
import { verifyToken, checkRole } from '../middlewares/authentication.js'

const orderRoutes = express.Router()

orderRoutes.post('/create', verifyToken, checkRole(["registered"]), orderController.createOrder)
orderRoutes.get('/all', verifyToken, checkRole(["admin"]), orderController.getAllOrders)
orderRoutes.get('/:id', verifyToken, checkRole(["admin"]), orderController.getOrderById)
orderRoutes.get('/:userId', verifyToken, checkRole(["admin", "registered"]), orderController.getOrdersByUser)
orderRoutes.put('/:id',verifyToken, checkRole(["admin"]), orderController.updateOrder)

export default orderRoutes