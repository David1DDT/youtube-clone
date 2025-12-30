'use client'
import React, { FormEvent, FormEventHandler, useRef } from 'react'
//@ts-ignore
import '../login/loginform.css'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const LoginForm = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const confirmpasswordRef = useRef<HTMLInputElement | null>(null)

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value
        const confirmPassword = confirmpasswordRef.current?.value
        const username = usernameRef.current?.value

        e.preventDefault()

        if (!email || !password) {
            return console.error("Missing cerdentials")
        }
        const response = await fetch("http://127.0.0.1:4000/api/users", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "confirmPassword": confirmPassword,
                "username": username
            }),
            credentials: "include"
        })
        if (!response.ok) {
            console.error("Login failed", await response.text())
            return
        }

        console.log("Login success")
        redirect("/login")

    }
    return (
        <div className='login-form'>
            <form noValidate onSubmit={submitHandler}>
                <h1>Register</h1>
                <input type="email" placeholder='email' ref={emailRef} required />
                <input type="text" placeholder='username' ref={usernameRef} required />
                <input type="password" max={64} min={6} placeholder='password' ref={passwordRef} required />
                <input type="password" max={64} min={6} placeholder='confirm password' ref={confirmpasswordRef} required />
                <button type="submit">Submit</button>
            </form>
            <Link href="/login">already have an account?</Link>
        </div>
    )
}

export default LoginForm