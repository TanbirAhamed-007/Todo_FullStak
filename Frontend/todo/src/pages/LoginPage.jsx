import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const { loginUser } = useContext(UserContext)
  const navigate = useNavigate()
  const login = () => {
    const logindata = {
      email: loginEmail,
      password: loginPass
    }
    loginUser(logindata)
  }

  const signup = () => {
    navigate('/register')
  }

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-8">
          <img
            className="mx-auto h-12 w-auto"
            src="https://www.svgrepo.com/show/499664/user-happy.svg"
            alt=""
          />
          <h2 className="mb-[40px] text-center text-3xl font-bold tracking-tight text-gray-900">
            Login in to your account
          </h2>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="">
              <input
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                name="email"
                type="email-address"
                autoComplete="email-address"
                required=""
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="">
              <input
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required=""
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              onClick={login}
              className="flex w-full mt-[30px] justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              Login
            </button>
            <p onClick={signup} className='cursor-pointer'>Create Account</p>
          </div>
        </div>
      </div>
    </div>


  )
}

export default LoginPage
