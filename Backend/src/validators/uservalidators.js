import yup, { Schema } from 'yup'

export const uservaildateSchema = yup.object({
    name: yup.string().required().trim().min(3, "name should have 3 letters"),
    email: yup.string().required().email(),
    password: yup.string()
        .required('Please Enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
})

export const validateuser = (Schema) => async (req, res, next) => {
    try {
        await Schema.validate(req.body);
        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}