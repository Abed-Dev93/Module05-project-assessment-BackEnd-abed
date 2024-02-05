import Product from '../models/Product.js'
import fs from 'fs'

const productController = {
    createProduct: async (req, res) => {
        try {
            const { title, description, price } = req.body
            const image = req.file?.path

            const newProduct = new Product({
                title,
                description,
                image,
                price
            })
           return res.status(200).json(newProduct)
        } catch (error) {
            console.error("Error creating product:", error)
           return res.status(500).json( {message:error.message})
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find()

            if (products.length === 0) {
                return res.status(404).json("Products Not Found")
            }

         return   res.status(200).json({ Products: products })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },
    getProductById: async (req, res) => {
        const id = req.params.id
        try {
            const product = await Product.findById({ _id: id })
            if (!product) {
                return  res.status(400).json({ message: "Product Not Found" })
            }
           return res.status(200).json(product)
        }
        catch (error) {
         return   res.status(404).json({ message: error.message })
        }
    },
    editProduct: async (req, res) => {
        const id=req.params.id
        const updatedFields = {...req.body }
        delete updatedFields._id

        const editedProduct = await Product.findById({ _id: id })
        if (req.file) {
            updatedFields.image = req.file.path
        }
        if (editedProduct) {
            const oldImage = editedProduct.image
            try {
                const updated = await Product.findByIdAndUpdate(id, updatedFields, { new: true })
                if (updated && req.file) {
                    fs.unlinkSync(oldImage)
                }
               return res.status(200).json(updated)
            }
            catch (error) {
                return res.status(500).json({ message: error.message })
            }
        }
        if(!editedProduct) {
          return  res.status(500).json({ message: "Product Not Found" })

        }
    },
    deleteProduct: async (req, res) => {
        const id = req.params.id
        try {
            const deletedProduct = await Product.findByIdAndDelete({ _id: id })
            if (!deletedProduct) {
             return   res.status(404).json({ error: 'Product not found' })
            }
            fs.unlinkSync(deletedProduct.image)
           return res.status(200).json({ message: "Product Deleted" })
        }
        catch (error) {
          return  res.status(404).json(error.message)
        }
    }
}

export default productController