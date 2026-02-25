import examUserSchema from "../models/examUserSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'
import examSessionSchema from "../models/examSessionSchema.js";
import { mailsend } from "../emailsend/mailsend.js";

export const examUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existing = await examUserSchema.findOne({ email })

        if (existing) {
            return res.status(401).json({
                success: false,
                message: `email ${email} already exist`,
            })
        }
        const hashpassword = await bcrypt.hash(password, 10)

        const data = await examUserSchema.create({ name, email, password: hashpassword });
        const token = jwt.sign({ id: data._id }, process.env.secretkey, {
            expiresIn: '3min'
        })

        mailsend(token, email)
        data.token = token
        data.save()
        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await examUserSchema.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found"
            })
        }
        const passwordcheck = await bcrypt.compare(password, user.password);
        if (!passwordcheck) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }
        if (passwordcheck && user.isverified === true) {
            await examSessionSchema.findOneAndDelete({ userid: user._id })
            await examSessionSchema.create({ userid: user._id })
            const accessToken = jwt.sign({ id: user._id }, process.env.secretkey, {
                expiresIn: "10days"
            })

            user.islogin = true;
            await user.save()

            return res.status(200).json({
                success: true,
                message: "Login Successfull",
                data: user,
                accessToken: accessToken
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Complete Verification First Then Login"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logout = async (req, res) => {
    try {
        const existing = await examSessionSchema.findOne({ userid: req.userid })
        const user = await examUserSchema.findById({ _id: req.userid })

        if (existing) {
            await examSessionSchema.findOneAndDelete({ userid: req.userid })
            user.islogin = false
            await user.save()

            return res.status(200).json({
                success: true,
                message: "Session Successfully Ended"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "User Had No Session "
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}