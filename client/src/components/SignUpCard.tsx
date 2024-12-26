import { useSignup } from '@/hooks/useSignup'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'

const SignUpCard: React.FC = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const { isLoading, isError, error, register, success } = useSignup();

    const onSubmit = async () => {
        await register({ name, email, password })
        console.log(success)
        if (success) {
            navigate("/dashboard")
        }
    }

    return (
        <Card className='min-w-[20%]'>
            <CardHeader className='flex justify-center'>
                <CardTitle className='text-center'>
                    Register
                </CardTitle>
                <p className='text-gray-500 text-sm text-center'>Welcome back, user!</p>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <Input
                    onChange={e => setName(e.target.value)}
                    placeholder='Your name' />
                <Input
                    onChange={e => setEmail(e.target.value)}
                    placeholder='someone@xyz.com' />
                <Input
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                    placeholder='********' />
                <Button onClick={onSubmit}>{isLoading ? "Loading..." : "Signup"}</Button>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
                {isError && (
                    <CardDescription className='text-red-500'>{error}</CardDescription>
                )}
                <CardDescription
                    className='cursor-pointer text-center'
                    onClick={() => navigate("/signin")}
                >Already have an account? <u className='font-semibold'>Login</u></CardDescription>

            </CardFooter>
        </Card>
    )
}

export default SignUpCard
