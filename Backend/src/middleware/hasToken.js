import jwt from 'jsonwebtoken'
import examUserSchema from '../models/examUserSchema.js'
import examSessionSchema from '../models/examSessionSchema.js'

export const hasToken = async (req, res, next) => {
    try {
        const authheader = req.headers.authorization
        if (!authheader || !authheader.startsWith("Bearer")) {
            return res.status(400).json({
                success: false,
                message: "Token authorization failed or not found"
            })
        }

        const token = authheader.split(" ")[1]
        jwt.verify(token, process.env.secretkey, async (error, decoded) => {
            if (error) {
                if (error.message === "ExpiredTokenError") {
                    return res.status(400).json({
                        success: false,
                        message: "Token Expired"
                    })
                }
                return res.status(400).json({
                    success: false,
                    message: "Token Invalied"
                })
            } else {
                const { id } = decoded
                const user = await examUserSchema.findById(id)

                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User Not Found"
                    })
                } else {
                       const existing = await examSessionSchema.findOne({ userid: id })
                    if (existing) {
                         req.userid = id
                         next()
                    }else{
                        return res.status(200).json({
                            success:true,
                            message:"The User Is Logged Out"
                        })
                    }
                    
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}