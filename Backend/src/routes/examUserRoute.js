import express from 'express'
import { examUserController, login, logout } from '../controllers/examUserController.js'
import { hasToken } from '../middleware/hasToken.js'
import { uservaildateSchema, validateuser } from '../validators/uservalidators.js'
import { verifyToken } from '../middleware/verifyToken.js'

const examUserRoute = express.Router()

examUserRoute.post("/create",validateuser(uservaildateSchema),examUserController)
examUserRoute.post("/login",login)
examUserRoute.get("/verify",verifyToken)
examUserRoute.delete("/logout",hasToken,logout)

export default examUserRoute