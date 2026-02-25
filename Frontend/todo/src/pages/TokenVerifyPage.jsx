import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'


const TokenVerifyPage = () => {
    const { TokenVerify } = useContext(UserContext)
    const [token, settoken] = useState('')

    const verifyToken = async () => {
        TokenVerify(token)
    }

    return (
        <div className='w-[100vw] h-[80vh] items-center content-center'>
            <div className="max-w-md mx-auto border mt-20 p-[10px]">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="otp"
                    >
                        Token:
                    </label>
                    <input
                        value={token}
                        onChange={(e) => settoken(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter Token"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={verifyToken}
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Verify
                    </button>
                </div>
            </div>

        </div>
    )
}

export default TokenVerifyPage
