import React from 'react'

export const EditTodoForm = () => {
  return (
    <form className='TodoForm'>
        <input type='text' className='todo-input' placeholder='What is the task today.?'></input>
        <button type='submit' className='todo-btn'></button>
    </form>
  )
}
