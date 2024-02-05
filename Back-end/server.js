import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectdb from './dbConfig/connectDB.js'
import { login, logOut, verifyToken, loggedInUser } from './middlewares/authentication.js'
import userRoutes from './routes/UserRoutes.js'
import productRoutes from './routes/ProductRoutes.js'
import orderRoutes from './routes/OrderRoutes.js'

const app = express()

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }))

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOption))
app.use(cookieParser())
app.use(express.json())

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

connectdb()

app.post("/login", login)
app.post("/logout", logOut)
app.use('/product',productRoutes)
app.use("/user", userRoutes)
app.use("/order", orderRoutes)
app.get("/logged-in-user", verifyToken, loggedInUser)
app.use('/images', express.static('images'))