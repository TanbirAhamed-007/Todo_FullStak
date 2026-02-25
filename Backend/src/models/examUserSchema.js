import mongoose from "mongoose";

export const examUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    islogin: {
        type: Boolean,
        default: false
    }, isverified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model("examUser", examUserSchema)
