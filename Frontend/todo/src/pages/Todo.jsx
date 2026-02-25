import React from 'react'
import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'


const Todo = () => {
  return (
    <div className='text-center w-full h-[100vh] bg-[#313647]'>
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default Todo
