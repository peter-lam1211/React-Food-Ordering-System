import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../css/LoginRegister.css'

export default function RegisterForm() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [userType, setUserType] = useState("customer")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [termAndCondition, setTermAndCondition] = useState(false)

    const resetRegisterData = () => {
        setUsername("")
        setEmail("")
        setAddress("")
        setPhone("")
        setPassword("")
        setConfirmPassword("")
        setUserType("customer")
        setTermAndCondition(false)
        setUsernameStyle({ border: '1px solid #333' })
        setEmailStyle({ border: '1px solid #333' })
        setAddressStyle({ border: '1px solid #333' })
        setPhoneStyle({ border: '1px solid #333' })
        setPasswordStyle({ border: '1px solid #333' })
        setConfirmPasswordStyle({ border: '1px solid #333' })
    }

    const [checkExist, setCheckExist] = useState([])

    const isEmailDuplicate = (inputEmail) => {

        let isDuplicate = false

        fetch(`http://` + window.location.host.split(":")[0] + `:8000/user?email=${inputEmail}`)
            .then(response => response.json())
            .then(data => {
                setCheckExist(data)
            })

        if (checkExist.length === 0)
            isDuplicate = true

        return isDuplicate
    }

    let isInputValid = true
    
    const [usernameStyle, setUsernameStyle] = useState({})
    const [emailStyle, setEmailStyle] = useState({})
    const [addressStyle, setAddressStyle] = useState({})
    const [phoneStyle, setPhoneStyle] = useState({})
    const [passwordStyle, setPasswordStyle] = useState({})
    const [confirmPasswordStyle, setConfirmPasswordStyle] = useState({})

    const [userNameErrorMsg, setUserNameErrorMsg] = useState("")
    const [emailErrorMsg, setEmailErrorMsg] = useState("")
    const [addressErrorMsg, setAddressErrorMsg] = useState("")
    const [phoneErrorMsg, setPhoneErrorMsg] = useState("")
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")
    const [confirmPasswordErrorMsg, setConfirmPassowrdErrorMsg] = useState("")

    const isUsernameValid = () => {
        if (username.length < 3) {
            setUsernameStyle({ border: '2px solid red' })
            setUserNameErrorMsg("Username should include at least 3 characters")
            isInputValid = false
        }
        else {
            setUsernameStyle({ border: '2px solid green' })
            setUserNameErrorMsg("")
            isInputValid = true
        }
    }

    const isEmailValid = () => {
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setEmailStyle({ border: '2px solid red' })
            setEmailErrorMsg("Email is not valid")
            isInputValid = false
        } else {
            setEmailStyle({ border: '2px solid green' })
            setEmailErrorMsg("")
            isInputValid = true
        }
    }

    const isAddressValid = () => {
        if (address === "" || address === null) {
            setAddressStyle({ border: '2px solid red' })
            setAddressErrorMsg("Address can not be empty")
            isInputValid = false
        } else {
            setAddressStyle({ border: '2px solid green' })
            setAddressErrorMsg("")
            isInputValid = true
        }
    }

    const isPhoneValid = () => {
        if (phone.length != 8) {
            setPhoneStyle({ border: '2px solid red' })
            setPhoneErrorMsg("Phone number is not valid")
            isInputValid = false
        } else {
            setPhoneStyle({ border: '2px solid green' })
            setPhoneErrorMsg("")
            isInputValid = true
        }
    }

    const isPasswordValid = () => {
        if (!password.match(/^(?=.*[a-zA-Z])(?=.*\d).+$/)) {
            setPasswordStyle({ border: '2px solid red' })
            setPasswordErrorMsg("Password must contain at least 1 letter and number")
            isInputValid = false
        } else if (password.length < 6) {
            setPasswordStyle({ border: '2px solid red' })
            setPasswordErrorMsg("Password must be at least 6 characters long")
            isInputValid = false
        } else {
            setPasswordStyle({ border: '2px solid green' })
            setPasswordErrorMsg("")
            isInputValid = true
        }
    }

    const isConfirmPasswordValid = () => {
        if (confirmPassword !== password) {
            setConfirmPasswordStyle({ border: '2px solid red' })
            setConfirmPassowrdErrorMsg("The password is not same")
            isInputValid = false
        } else {
            setConfirmPasswordStyle({ border: '2px solid green' })
            setConfirmPassowrdErrorMsg("")
            isInputValid = true
        }
    }

    const isRegisterValid = () => {
        let isProceed = true
        let errorMsg

        if (username === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
            isProceed = false
            errorMsg = "username / email / address / phone / password / confirmed password is empty !"
        }

        if (isEmailDuplicate(email) === false) {
            isProceed = false
            errorMsg = "The email is used"
        }

        if (termAndCondition === false) {
            isProceed = false
            errorMsg = "You need to agree all of the term and condition"
        }

        if (!isProceed) {
            toast.warning(errorMsg)
        }

        return isProceed
    }

    const handleRegister = (e) => {
        e.preventDefault()
        let registerObj = { username, email, address, phone, password, userType }

        if (isRegisterValid() && isInputValid === true) {

            fetch("http://" + window.location.host.split(":")[0] + ":8000/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(registerObj)
            }).then(() => {
                toast.success('Registered successfully')
                resetRegisterData()
            }).catch((err) => {
                toast.error('Failed :' + err.message)
            })

        }
    }

    useEffect(() => {
        resetRegisterData()
    }, [])

    return (
        <div className='form-container sign-up'>
            <form onSubmit={handleRegister}>
                <div className='head-group'>
                    <h2>Sign Up</h2>
                    <select value={userType} onChange={e => setUserType(e.target.value)}>
                        <option value="customer">Customer</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="delivery">Delivery</option>
                    </select>
                </div>
                <div className='input-group'>
                    <input
                        type='text'
                        style={usernameStyle}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onKeyUp={isUsernameValid}
                        required />
                    {
                        userNameErrorMsg != '' &&
                        <p className='input-errorMsg'>{userNameErrorMsg}</p>
                    }
                    <label className='input-label'>Username</label>
                </div>
                <div className='input-group'>
                    <input
                        type='email'
                        style={emailStyle}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyUp={isEmailValid}
                        required />
                    {
                        emailErrorMsg != '' &&
                        <p className='input-errorMsg'>{emailErrorMsg}</p>
                    }
                    <label>Email Address</label>
                </div>
                {
                    userType != 'customer' &&
                    <div className='input-group'>
                        <input
                            type='text'
                            style={addressStyle}
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            onKeyUp={isAddressValid}
                            required />
                        {
                            addressErrorMsg != '' &&
                            <p className='input-errorMsg'>{addressErrorMsg}</p>
                        }
                        <label>Address</label>
                    </div>
                }
                <div className='input-group'>
                    <input
                        type='number'
                        style={phoneStyle}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        onKeyUp={isPhoneValid}
                        required />
                    {
                        phoneErrorMsg != '' &&
                        <p className='input-errorMsg'>{phoneErrorMsg}</p>
                    }
                    <label>Phone Number</label>
                </div>
                <div className='input-group'>
                    <input
                        type='password'
                        style={passwordStyle}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyUp={isPasswordValid}
                        required />
                    {
                        passwordErrorMsg != '' &&
                        <p className='input-errorMsg'>{passwordErrorMsg}</p>
                    }
                    <label>Password</label>
                </div>
                <div className='input-group'>
                    <input
                        type='password'
                        style={confirmPasswordStyle}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        onKeyUp={isConfirmPasswordValid}
                        required />
                    {
                        confirmPasswordErrorMsg != '' &&
                        <p className='input-errorMsg'>{confirmPasswordErrorMsg}</p>
                    }
                    <label>Confirmed Password</label>
                </div>
                <div className='agreementTerm'>
                    I agree all of <Link className='agreementTerm-link' to="/TermAndCondition">the term and condition</Link> <input type='checkbox' value={termAndCondition} onChange={e => setTermAndCondition(e.target.checked)}></input>
                </div>
                <button type='submit' className='btn'>Sign Up</button>
                <div className='sign-label'>
                    <p>Already have an account?<a href='#' className='sign-in-link'> Sign In</a></p>
                </div>
            </form>
        </div>
    )
}
