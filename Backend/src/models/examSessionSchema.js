import mongoose, { Types } from "mongoose";

export const examSession = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    issuedAT:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

export default mongoose.model("examSessions",examSession)