import React, { useEffect } from 'react'
import { useTodo } from '../hooks/useTodo'
import Todo from './Todo'

const TodoSection: React.FC = () => {

    const { getTodos, isPending, error, todos } = useTodo()

    useEffect(() => {
        getTodos();
    }, [getTodos])

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
        <section>
            {todos.map((todo) => {
                return <Todo
                    content={todo.content}
                    completed={todo.completed}
                    id={todo.id}
                />
            })}
        </section>
    )
}

export default TodoSection
