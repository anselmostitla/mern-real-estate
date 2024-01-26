import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const MONGO_PASS = process.env.MONGO_PASS
const MONGO_URL = `mongodb+srv://domloyordi:${MONGO_PASS}@cluster0.bnno0fa.mongodb.net/ElixEstate?retryWrites=true&w=majority`

export const connector = () => {
   mongoose.connect(MONGO_URL)
   console.log("db connected...")   
}

