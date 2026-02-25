import yup, { Schema } from 'yup'

export const todoValidateSchema = yup.object({
    title: yup.string().required().trim().min(3, "title should have 3 letters"),
    description:yup.string().required().trim().min(10, "description Must have 10 letters")
})

export const validateTodo = (Schema) => async (req, res, next) => {
    try {
        await Schema.validate(req.body);
        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}