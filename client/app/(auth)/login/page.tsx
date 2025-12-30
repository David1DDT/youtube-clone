'use client'
import React, { FormEvent, FormEventHandler, useRef } from 'react'
//@ts-ignore
import './loginform.css'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const LoginForm = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        e.preventDefault()

        if (!email || !password) {
            return console.error("Missing cerdentials")
        }
        const response = await fetch("http://127.0.0.1:4000/api/auth", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
            credentials: "include"
        })
        if (!response.ok) {
            console.error("Login failed", await response.text())
            return
        }

        console.log("Login success")
        redirect("/")

    }
    return (
        <div className='login-form'>
            <form noValidate onSubmit={submitHandler}>
                <h1>Login</h1>
                <input type="email" name='email' placeholder='email' ref={emailRef} />
                <input type="password" name='password' max={64} min={6} placeholder='password' ref={passwordRef} />
                <button type="submit">Submit</button>
            </form>
            <Link href="/register">dont have an account?</Link>
        </div>
    )
}

export default LoginForm