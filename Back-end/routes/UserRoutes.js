import express from 'express'
import userController from '../controllers/UserController.js'
import { verifyToken, checkRole } from '../middlewares/authentication.js'

const userRoutes = express.Router()

userRoutes.post('/register', userController.register)
userRoutes.get('/all', verifyToken, checkRole(["admin"]), userController.getAllUsers)
userRoutes.get('/:id', verifyToken, checkRole(["admin"]), userController.getUserById)
userRoutes.put('/:id', verifyToken, userController.updateUserById)
userRoutes.delete('/:id', verifyToken, checkRole(["admin"]), userController.deleteUserById)

export default userRoutes