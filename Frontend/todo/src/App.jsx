import React from 'react'
import SignupPage from './pages/SignupPage'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Todo from './pages/Todo'
import UpdateModal from './modals/UpdateModal'
import HomePage from './pages/HomePage'
import TokenVerifyPage from './pages/TokenVerifyPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<SignupPage />} />
        <Route path='/verify' element={<TokenVerifyPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/update/:id' element={<UpdateModal />} />
      </Routes>
    </div>
  )
}

export default App
