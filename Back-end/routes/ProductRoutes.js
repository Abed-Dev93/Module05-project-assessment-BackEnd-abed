import express from 'express'
import productController from '../controllers/ProductController.js'
import Upload from '../middlewares/multer.js'
import { verifyToken, checkRole, loggedInUser } from '../middlewares/authentication.js'

const productRoutes = express.Router()

productRoutes.post('/create', verifyToken, checkRole(["admin"]), Upload.single("image"), productController.createProduct)
productRoutes.get('/all', productController.getAllProducts)
productRoutes.get('/:id', verifyToken, loggedInUser, productController.getProductById)
productRoutes.put('/:id', verifyToken, checkRole(["admin"]), Upload.single("image"), productController.editProduct)
productRoutes.delete('/:id', verifyToken, checkRole(["admin"]), productController.deleteProduct)

export default productRoutes