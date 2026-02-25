import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext'


const TodoForm = () => {
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const { createTodo } = useContext(TodoContext)
    const { logedout } = useContext(TodoContext)
    const handeltodo = () => {
        const data = {
            title: title,
            description: description
        }
        createTodo(data)
        settitle('')
        setdescription('')
    }
    const namee = localStorage.getItem('name')
    return (
        <div>
            <div>
                {
                    <p className='text-white flex justify-between px-3 py-2'>{`Hi, ${namee}`} <span><button onClick={logedout} className='bg-green-600 text-white w-[90px] h-[30px] rounded-md'>Logout</button></span></p>
                }
            </div>
            <h1 className='text-4xl text-white'>TODO APP</h1>
            <div>
                <input value={title} onChange={(e) => settitle(e.target.value)} className='mb-2 mt-[20px] outline-none p-[5px] rounded-md md: w-[45%] mr-2 lg:w-[20%]' type="text" placeholder='Enter Your Title' />
                <input value={description} onChange={(e) => setdescription(e.target.value)} className='outline-none p-[5px] rounded-md md: w-[25%] mr-2 lg:w-[20%] ' type="text" placeholder='Enter Your Description' /> <br />
                <button onClick={handeltodo} className='bg-green-600 text-white w-[90px] h-[30px] rounded-md mt-3'>Submit</button>
            </div>
        </div>
    )
}

export default TodoForm
