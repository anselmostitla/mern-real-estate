import express from 'express'

const app = express()

const PORT = 3000

app.listen(PORT, () => {
   console.log(`Server is in deep running on port ${PORT}`)
})