import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTodo } from '../hooks/useTodo'

const Sidebar: React.FC = () => {
    const [dialog, setDialog] = useState(false)
    const [content, setContent] = useState("")

    const { setTodo, isPending, error } = useTodo()

    const toggleDialog = () => setDialog(prev => !prev)

    const addTodo = async () => await setTodo(content)

    return (
        <div className='flex flex-col bg-neutral-900 h-screen gap-4'>

            <div className='flex justify-center items-center p-2 font-semibold text-white mt-4 hover:text-blue-300 cursor-pointer'>
                Notes Native
            </div>
            <div className='flex justify-center items-center p-2 font-semibold text-white mt-20 hover:text-yellow-400 cursor-pointer'>
                <Link to={"/dashboard"}>Dashboard</Link>
            </div>
            <div className='flex justify-center items-center p-2 font-semibold text-white hover:text-yellow-400 cursor-pointer'>
                <Link to={"/todos"}>Todos</Link>
            </div>
            <div className='flex justify-center items-center p-2 font-semibold text-white hover:text-yellow-400 cursor-pointer'>
                <Link to={"/notes"}>Notes</Link>
            </div>

            {dialog && (
                <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-800 p-8 flex flex-col items-center gap-4 text-white rounded-md shadow-lg animation-1s transition-all min-w-[30%]'>
                    {(isPending || error) ? (
                        <div>
                            {error ? error : "Loading..."}
                        </div>
                    ) : (
                        <>
                            <input
                                onChange={e => setContent(e.target.value)}
                                placeholder='Enter todo...'
                                className='p-2 rounded bg-inherit min-w-full'
                            />
                            <button
                                onClick={addTodo}
                                className='p-2 rounded-md bg-yellow-400 min-w-full text-black'>
                                Add Todo
                            </button>
                        </>
                    )}
                </div>
            )}

            <button onClick={toggleDialog}
                className='mt-auto p-4 rounded-md bg-yellow-400 '>
                Add Item
            </button>
        </div>
    )
}

export default Sidebar
