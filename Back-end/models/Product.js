import mongoose from "mongoose"
import mongoos from "mongoose"

const Schema = mongoose.Schema

const product = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    image: {
        type: String,
        required: true
    }
    ,
    price: {
        type: Number,
        min: 1,
        required: true
    }
},
{
    Timestamps: true
})

export default mongoose.model('Product', product)