import React from 'react'
import { useTodo } from '../hooks/useTodo'
import Todo from './Todo'

const CompletedTodos: React.FC = () => {
  const { completedTodos, isPending, error } = useTodo()

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-4 bg-blue-100 text-blue-600 rounded-md shadow-md">
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-100 text-red-600 rounded-md shadow-md">
        Something went wrong!
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center p-2'>
      <h2>Pending Todos</h2>
      {completedTodos.map((todo) => {
        return <Todo
          completed={todo.completed}
          id={todo.id}
          content={todo.content}
        />
      })}
    </div>
  )
}

export default CompletedTodos
