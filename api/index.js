import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()




const MONGO_PASS = process.env.MONGO_PASS
const MONGO_URL = `mongodb+srv://domloyordi:${MONGO_PASS}@cluster0.bnno0fa.mongodb.net/ElixEstate?retryWrites=true&w=majority`
mongoose.connect(MONGO_URL)
   .then(() => console.log("Connections successfull"))
   .catch((error) => error.message)

const app = express()




const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
   console.log(`Server is in deep running on port ${PORT}`)
})