import express from 'express'
import dotenv from 'dotenv/config'
import { mongoDbConnect } from './src/config/MongoDb.js'
import examUserRoute from './src/routes/examUserRoute.js'
import todoRoute from './src/routes/examTodoRoute.js'
import cors from 'cors'


const app = express()

const port = process.env.PORT
mongoDbConnect()
app.use(express.json())
app.use(cors())
app.use("/user",examUserRoute)
app.use("/todo",todoRoute)
app.listen(port, () => {
    console.log(`server is runnung at port ${port}`)
})