import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteModal from "../modals/DeleteModal";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../modals/UpdateModal";

export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
    const [gettodo, setgettodo] = useState([])

    const [refresh, setrefresh] = useState(false)

    const [delmodal, setdelmodal] = useState(false)
    const [delid, setdelid] = useState(null)

    const [updatemodalll, setupdatemodal] = useState(false)
    const [updateitem, setupdateitem] = useState(null)

    const navigate = useNavigate();

    const getalltodo = async () => {
        try {
            const Token = localStorage.getItem('accesstoken')
            const response = await axios.get("http://localhost:9005/todo/getall", {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            setgettodo(response.data.data)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Something Went Wrong")
            }
        }
    }
    const createTodo = async (data) => {
        setrefresh(false)
        try {
            const token = localStorage.getItem('accesstoken')
            const response = await axios.post('http://localhost:9005/todo/create', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(response.data.message)
            setrefresh(true)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Something Went Wrong")
            }
        }
    }

    const deletemodal = (id) => {
        setdelmodal(true)
        setdelid(id)
    }

    const confrimdel = async () => {
        setrefresh(false)
        try {
            const token = localStorage.getItem('accesstoken')
            const response = await axios.delete(`http://localhost:9005/todo/delete/${delid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(response.data.message)
            setrefresh(true)
            setdelmodal(false)
            setdelid(null)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Something Went Wrong")
            }
        }
    }
    const Canceldel = () => {
        setdelmodal(false)
        setdelid(null)
    }

    const update = (item) => {
        setupdatemodal(true)
        setupdateitem(item)
        navigate(`/update/${item._id}`)
    }
    const confrimupdate = async (data) => {
        setrefresh(false)
        try {
            const token = localStorage.getItem('accesstoken')
            const upadte = {
                title: data.title,
                description: data.description
            }
            const response = await axios.put(`http://localhost:9005/todo/update/${updateitem._id}`, upadte, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate('/todo')
            setrefresh(true)

            toast.success(response.data.message)
            setrefresh(true)
            setupdatemodal(false)
            setupdateitem(null)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Something Went Wrong")
            }
        }
    }
    const cancelupdate = () => {
        setupdatemodal(false)
        setupdateitem(null)
        navigate('/todo')
    }

    const logedout = async () => {
        setrefresh(false)
        try {
            const token = localStorage.getItem('accesstoken')
            const response = await axios.delete("http://localhost:9005/user/logout", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('accesstoken')
            localStorage.removeItem('name')
            toast.success(response.data.message)
            navigate('/login')
            setrefresh(false)

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Something Went Wrong")
            }
        }
    }
    useEffect(() => {
        const Token = localStorage.getItem('accesstoken')
        if (Token) {
            navigate('/todo')
            getalltodo()
            return
        }

    }, [refresh])

    return (
        <TodoContext.Provider value={{ createTodo, deletemodal, update, getalltodo, logedout, gettodo, Canceldel, confrimdel, cancelupdate, confrimupdate }}>
            {children}
            {delmodal && <DeleteModal />}
            {updatemodalll && <UpdateModal currentTitle={updateitem.title} currentDescription={updateitem.description} />}
        </TodoContext.Provider>
    )
}
