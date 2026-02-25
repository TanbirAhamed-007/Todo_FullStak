import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();

    const SignUp = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:9005/user/create",
                data
            );
            toast.success(response.data.message);
            navigate("/verify");
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something Went Wrong");
            }
        }
    };

    const TokenVerify = async (token) => {
        try {
            const response = await axios.get('http://localhost:9005/user/verify', {
                headers: {
                    Authorization: `Bearer ${token.trim()}`
                }
            })
            toast.success(response.data.message)
            navigate('/login')
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Something Went Wrong")
            }
        }
    };


    const loginUser = async (logindata) => {
        try {
            const response = await axios.post('http://localhost:9005/user/login', logindata)
            toast.success(response.data.message)

            navigate('/todo')
            const accesstoken = response.data.accessToken
            const name = response.data.data.name
            localStorage.setItem("accesstoken", accesstoken)
            localStorage.setItem("name", name)

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Something Went Wrong")
            }
        }
    }

    return (
        <UserContext.Provider value={{ SignUp, loginUser, TokenVerify }}>
            {children}
        </UserContext.Provider>
    );
};