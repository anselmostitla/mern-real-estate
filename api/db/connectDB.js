// This is the email in mongodb
// domloyordi@gufum.com

import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const MONGO_PASS = process.env.MONGO_PASS
const MONGO_URL = `mongodb+srv://mongodb:${MONGO_PASS}@cluster0.w4vhbjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// `mongodb+srv://domloyordi:${MONGO_PASS}@cluster0.bnno0fa.mongodb.net/ElixEstate1?retryWrites=true&w=majority`

export const connector = () => {
   mongoose.connect(MONGO_URL)
   console.log("db connected...")    
}

