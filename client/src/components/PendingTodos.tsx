import React from 'react'
import { useTodo } from '../hooks/useTodo'
import Todo from './Todo'

const PendingTodos: React.FC = () => {
  const { pendingTodos } = useTodo()

  return (
    <div className='flex flex-col items-center p-2'>
      <h2>Pending Todos</h2>
      {pendingTodos.map((todo) => {
        return <Todo
          completed={todo.completed}
          id={todo.id}
          content={todo.content}
        />
      })}
    </div>
  )
}

export default PendingTodos
