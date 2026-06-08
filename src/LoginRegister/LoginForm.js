import React, { useEffect, useState } from 'react'
import '../css/LoginRegister.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const GoMainPage = useNavigate()

    useEffect(() => {
        sessionStorage.clear()
    }, [])

    const resetLoginData = () => {
        setEmail("")
        setPassword("")
    }

    const handleLogin = (e) => {
        e.preventDefault()

        if (isLoginValid()) {

            fetch(`http://` + window.location.host.split(":")[0] + `:8000/user?email=${email}`).then((res) => {
                return res.json()
            }).then((resp) => {
                
                if (resp.length === 0) {
                    toast.error("Please enter registered email!")
                } else {
                    if (resp[0].password === password) {

                        if (resp[0].userType === "customer") {

                            toast.success("Login successfully!")
                            sessionStorage.setItem('userID', resp[0].id)
                            sessionStorage.setItem('userEmail', email)
                            sessionStorage.setItem('username', resp[0].username)
                            GoMainPage("/IndexCustomer")

                        } else if (resp[0].userType === "restaurant") {

                            toast.success("Login successfully!")
                            sessionStorage.setItem('userID', resp[0].id)
                            sessionStorage.setItem('userEmail', email)
                            sessionStorage.setItem('username', resp[0].username)
                            GoMainPage("/IndexRestaurant")

                        } else if (resp[0].userType === "delivery") {

                            toast.success("Login successfully!")
                            sessionStorage.setItem('userID', resp[0].id)
                            sessionStorage.setItem('userEmail', email)
                            sessionStorage.setItem('username', resp[0].username)
                            GoMainPage("/IndexDelivery")

                        }

                    } else {
                        toast.error("Please enter valid password")
                        console.log(resp)
                    }
                }


            }).catch((err) => {
                toast.error("Login Failed due to : " + err.message)
            })
        }
    }

    const isLoginValid = () => {
        let isCorrect = true

        if (email === "" || password === "") {
            isCorrect = false
            toast.warning("The email or password is empty")
        }

        return isCorrect
    }

    useEffect(() => {
        resetLoginData()
    }, [])

    return (
        <div className='form-container sign-in'>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className='input-group'>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} required/>
                    <label>Email</label>
                </div>
                <div className='input-group'>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} required/>
                    <label>Password</label>
                </div>
                <button type='submit' className='btn'>Login</button>
                <div className='sign-label'>
                    <p>Don't have an account?<a href='#' className='sign-up-link'> Sign up</a></p>
                </div>
            </form>
        </div>
    )
}



