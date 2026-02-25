import mongoose from "mongoose";

export const examTodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"examUser",
        required:true
    }
},{timestamps:true})

export default mongoose.model("examTodos",examTodoSchema)