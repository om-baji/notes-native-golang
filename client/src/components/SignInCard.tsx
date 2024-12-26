import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { useSignin } from '@/hooks/useSignin'
import { toast } from 'sonner'

const SignInCard: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const { isLoading, isError, error, login, success } = useSignin();

    const onSubmit = async () => {
        await login({ email, password })
        console.log(success)
        if (success) {
            toast("Sign in success")
            toast("Welcome back!")
            navigate("/dashboard")
        }
    }

    return (
        <Card className='min-w-[20%]'>
            <CardHeader className='flex justify-center'>
                <CardTitle className='text-center'>
                    Login
                </CardTitle>
                <p className='text-gray-500 text-sm text-center'>Welcome back, user!</p>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <Input
                    onChange={e => setEmail(e.target.value)}
                    placeholder='someone@xyz.com' />
                <Input
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                    placeholder='********' />
                <Button onClick={onSubmit}>{isLoading ? "Loading..." : "Login"}</Button>
            </CardContent>
            <CardFooter className='flex flex-col'>
                <CardDescription
                    className='cursor-pointer text-center'
                    onClick={() => navigate("/signup")}
                >New to Notes Native? <u className='font-semibold'>Register</u></CardDescription>
                {isError && (
                    <CardDescription className='text-red-600'>{error}</CardDescription>
                )}
            </CardFooter>
        </Card>
    )
}

export default SignInCard
