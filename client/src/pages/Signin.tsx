import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignin } from '../hooks/useSignin'

const SignIn: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { isLoading, isError, error, login } = useSignin();

    const onSubmit = async () => {
        await login({ email, password })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center gap-4 items-center md:h-screen bg-neutral-100 min-h-[600px]">
                <span>Welcome back!</span>

                <input
                    placeholder="someone@abc.com"
                    className="p-2 rounded-md w-[50%]"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="******"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 rounded-md w-[50%]"
                />

                <button
                    onClick={onSubmit}
                    className="p-2 rounded-md w-[50%] bg-neutral-900 text-white"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                {isError && (
                    <span className="text-red-500">Error: {error}</span>
                )}

                <Link to={"/signup"} className="text-sm">
                    <span className="text-gray-500">New to Notes Native?</span>{" "}
                    <u>Register</u>
                </Link>
            </div>

            <div className="order-first md:order-last flex justify-center items-center md:h-screen bg-neutral-900">
                <div className="text-center text-white p-6 max-w-lg">
                    <div className="text-3xl font-bold mb-4 text-white">Notes Native</div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        "Your go-to app for managing notes and to-dos, keeping everything
                        organized and accessible in one place. Simplify your workflow
                        today."
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
