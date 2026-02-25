import examTodoSchema from "../models/examTodoSchema.js";

export const todocreate = async (req, res) => {
    try {
        const { title } = req.body
        const {description} = req.body
        const data = await examTodoSchema.create({
            title: title,
            description:description,
            userid: req.userid
        })
        return res.status(201).json({
            success: true,
            message: "Todo Created Successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getall = async (req, res) => {
    try {
        const data = await examTodoSchema.find({
            userid: req.userid
        })
        return res.status(200).json({
            success: true,
            message: "Todo Fetched Successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const deletetodo = async (req, res) => {
    try {
        const { id } = req.params
        const data = await examTodoSchema.findByIdAndDelete({
            _id: id,
            userid: req.userid
        })
        if(!data){
            return res.status(400).json({
                success:false,
                message:"Todo Already Deleted"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Todo deleted Successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updatetodo = async (req, res) => {
    try {
        const { title } = req.body
        const { description } = req.body
        const { id } = req.params
        const data = await examTodoSchema.findOne({
            _id: id,
            userid: req.userid
        })
        if(!data){
            return res.status(404).json({
                success:false,
                message:"Todo Not Found"
            })
        }
        data.title = title
        data.description = description
        await data.save()
        return res.status(200).json({
            success: true,
            message: "Todo Update Successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}