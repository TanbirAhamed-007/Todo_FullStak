import express from 'express'
import { deletetodo, getall, todocreate, updatetodo } from '../controllers/examTodoController.js'
import { hasToken } from '../middleware/hasToken.js'
import { todoValidateSchema, validateTodo } from '../validators/todovalidators.js'

const todoRoute = express.Router()

todoRoute.post("/create", hasToken, validateTodo(todoValidateSchema), todocreate)
todoRoute.get("/getall", hasToken, getall)
todoRoute.delete("/delete/:id", hasToken, deletetodo)
todoRoute.put("/update/:id", hasToken, validateTodo(todoValidateSchema), updatetodo)

export default todoRoute