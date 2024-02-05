import mongoose from "mongoose"

const url = process.env.DB_URL

const connectdb = () => {
    mongoose.connect(url)
    .then(() => {
        console.log('Database Connected!')
    })
    .catch((error) => {
        console.log(errorrror)
    })
}

export default connectdb