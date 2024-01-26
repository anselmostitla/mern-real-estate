import express from 'express'
import { connector } from './db/connectDB.js'
import userRouter from './routes/user.route.js'







const app = express()
app.use('/api/v1/user', userRouter)




const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
   connector()
   console.log(`Server running on port ${PORT}`)
})