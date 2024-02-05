import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userController = {
    register: async (req, res) => {
        const { name, email, password, role } = req.body
        try {
          if (!password || typeof password !== "string") {
            return res
              .status(400)
              .json({ error: "Invalid password in the request body" })
          }
          const existingUser = await User.findOne({ email })
          if (existingUser) {
            return res.status(400).json({ error: "Email already exists" })
          }
          const saltRounds = 10
          const hashedPassword = await bcrypt.hash(password, saltRounds)
          const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "registered"
          })
          await newUser.save()
    
          const isSecure = process.env.NODE_ENV === "production"
          const token = jwt.sign(
            { _id: newUser._id, role: newUser.role, email, name },
            process.env.SECRET_TOKEN,
            { expiresIn: "24h" }
          )
          res.cookie("token", token, {
            httpOnly: true,
            secure: isSecure,
            sameSite: "None",
          })
    
          return   res.status(201).json(newUser)
        } catch (error) {
          console.log(error)
          return  res.status(500).json({ error: "Internal Server Error" })
        }
      },
      getAllUsers: async (req, res) => {
        try {
          const users = await User.find()
          return   res.status(200).json({ Users: users })
        } catch (error) {
          return  res.status(500).json({ message: error.message })
        }
      },
      getUserById: async (req, res) => {
        const id = req.params.id
        try {
          const user = await User.findById({ _id: id })
          if (!user) {
            return    res.status(404).json({ message: "User not found" })
          }
          return  res.status(200).json(user)
        } catch (error) {
          return  res.status(500).json({ message: "key one" + error.message })
        }
      },
      updateUserById: async (req, res) => {
        const id = req.params.id
        try {
          const { name, email, password, role } = req.body
      
          if (password && (typeof password !== "string" || password.length === 0)) {
            return res.status(400).json({ message: "Invalid password in the request body" })
          }
      
          const user = await User.findById({ _id: id })
      
          if (!user) {
            return res.status(404).json({ message: "User not found" })
          }
      
          let isOldPasswordValid = true
      
          if (password) {
            isOldPasswordValid = await bcrypt.compare(oldPasswordInput, user.password)
      
            if (!isOldPasswordValid) {
              return res.status(401).json({ message: "Invalid old password" })
            }
          }
      
          const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : undefined
      
          const updatedUser = await User.findByIdAndUpdate(
            id,
            {
              name,
              email,
              ...(hashedPassword && { password: hashedPassword }),
              role
            },
            {
              new: true
            }
          )
      
          return  res.status(200).json(updatedUser)
        } catch (error) {
          return  res.status(500).json({ message: error.message })
        }
      },
      deleteUserById: async (req, res) => {
        const id = req.params.id
        try {
          const deletedUser = await User.findByIdAndDelete({ _id: id })
          if (!deletedUser) {
            res.status(404).json({ message: "User not found" })
            return
          }
          return res.status(200).json({ message: "User deleted successfully" })
        } catch (error) {
          return  res.status(500).json({ message: error.message })
        }
      }
}

export default userController