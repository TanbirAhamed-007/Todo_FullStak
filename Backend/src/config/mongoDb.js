import mongoose from "mongoose";
import dotenv from 'dotenv/config'

const url = process.env.URL

export async function mongoDbConnect() {
    try {
        await mongoose.connect(url)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("MongoDB Not Connected",error)
    }
}