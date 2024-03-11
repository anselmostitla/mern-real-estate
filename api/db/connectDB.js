// This is the email in mongodb
// domloyordi@gufum.com

import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const MONGO_PASS = process.env.MONGO_PASS
//mern-real-estate3
const MONGO_URL=`mongodb+srv://mongodb:${MONGO_PASS}@cluster0.mrlex8b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

export const connector = async() => {
   await mongoose.connect(MONGO_URL)
   console.log("db connected...")    
}

