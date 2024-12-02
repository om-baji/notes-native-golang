import { z } from "zod";

export const SignUpSchema = z.object({
    name : z.string().min(2,{ message : "Min. 3 char(s)"}),
    email : z.string().min(5,{ message : "Min. 3 char(s)"}).email(),
    password : z.string().min(4,{ message : "Min. 3 char(s)"})
})

export const SignInSchema = z.object({
    email : z.string().min(5,{ message : "Min. 3 char(s)"}).email(),
    password : z.string().min(4,{ message : "Min. 3 char(s)"})
})
