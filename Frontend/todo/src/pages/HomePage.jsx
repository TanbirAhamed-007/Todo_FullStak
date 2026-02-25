import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../assets/HomePic.png'

const HomePage = () => {
    return (
        <div>
            <nav className='flex justify-between px-3 h-[50px] items-center bg-[#9CB380] text-white'>
                <h1 className='text-2xl'>HELLO</h1>
                <Link className='inline-block text-center justify-center content-center rounded-md  w-[110px] h-[35px] bg-[red]' to={'/register'}>Register</Link>
            </nav>
            <div className='w-[100vw] h-[80vh] content-center justify-center flex mt-2'>
        <img className='w-[90vw] h-[80vh] rounded-lg' src={bg} alt="" />
            </div>
        </div>
    )
}

export default HomePage
