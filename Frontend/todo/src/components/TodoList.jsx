import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext'

const TodoList = () => {
    const { gettodo, deletemodal, update } = useContext(TodoContext)

    const handeldel = (id) => {
        deletemodal(id)
    }
    const handelupdate = (item) => {
        update(item)
    }
    return (
            <div className='bg-[#435663] w-[90%] max-h-[370px] min-h-[370px] p-[10px] mt-2 justify-self-center rounded-md overflow-y-scroll lg:w-[50%]'>
                <div className='text-white'>
                    {
                        gettodo.map((item) => (<h4 className='w-[90%] h-[110px] p-[10px] relative justify-items-center rounded-md justify-self-center bg-white text-black mt-2 lg:w-[70%]' key={item._id}>
                            <p className='w-[80%] bold font-bold justify-self-center overflow-x-scroll text-nowrap'>{item.title}</p>
                            <p className='w-[80%] bg-red-800 text-white text-left p-[5px] rounded-md justify-self-center overflow-x-scroll pr-4 text-nowrap'>{item.description}</p>
                            <p className='absolute mt-[10px]'>
                                <button onClick={() => handeldel(item._id)} className='bg-red-600 text-white w-[90px] h-[30px] rounded-md mr-1'>Delete</button>
                                <button onClick={() => handelupdate(item)} className='bg-green-600 text-white w-[90px] h-[30px] rounded-md'>Edit</button>
                            </p>
                        </h4>))
                    }
                </div>
            </div>
    )
}

export default TodoList
