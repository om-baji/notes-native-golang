import { useState } from "react"
import { useTodo } from "../hooks/useTodo"

type todoProps = {
    content: string,
    completed: boolean,
    id: number
}

const Todo: React.FC<todoProps> = ({ content, completed, id }) => {

    const [isChecked, setIsChecked] = useState(completed)
    const { toggle } = useTodo()

    const handleToggle = () => {
        toggle(id)
        setIsChecked(pre => !pre)
    }

    return (
        <div key={id} className="flex items-center justify-between">
            <div className="flex items-center">
                <label htmlFor={`checkbox-${id}`} className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        id={`checkbox-${id}`}
                        className="mr-4 w-5 h-5 accent-yellow-400"
                        checked={isChecked}
                        onChange={handleToggle}
                    />
                    <h3
                        className={`text-xl font-semibold ${isChecked ? "line-through text-neutral-500" : "text-neutral-800"}`}
                    >
                        {content}
                    </h3>
                </label>
            </div>
        

            {/* {expanded && (
                <button
                    onClick={}
                    className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                    &times;
                </button>
            )} */}
        </div>
    )
}

export default Todo
