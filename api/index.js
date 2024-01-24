import express from 'express'
import { connector } from './db/connectDB.js'







const app = express()




const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
   connector()
   console.log(`Server is in deep running on port ${PORT}`)
})