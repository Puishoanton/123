import express from 'express'
import mongoose from 'mongoose'
import router from './authRouter.js'

const PORT = process.env.PORT || 80

const app = express()
const DB_URl = 'mongodb+srv://admin:adminadmin@cluster0.syic9u6.mongodb.net/'

app.use(express.json())
app.use('/auth', router)

const startApp = async () => {
  try {
    await mongoose.connect(DB_URl)
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  } catch (e) {
    app.status(500).json(e.message)
  }
}

startApp()
