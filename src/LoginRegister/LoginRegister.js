import React, { useEffect, useState } from 'react'
import '../css/LoginRegister.css'
import imageSlide from './SliderData'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import NavBarCustomer from '../CustomerPage/NavBarCustomer'
import Footer from '../Footer'

export default function LoginRegister() {

    // Background silder
    const [currentState, setCurrentState] = useState(0)

    if(currentState == 0)
    {
        let currentSpan = document.querySelectorAll('.change-image-btn span')

        if(currentSpan.length != 0)
            currentSpan[0].classList.add('currentState-identify')
    }

    useEffect(() => {

        const currentSpan = document.querySelectorAll('.change-image-btn span')

        const timer = setTimeout(() => {

            var number = 0

            if(currentState === 4) {
                setCurrentState(0)
                number = 0
                // console.log(number)
            }
            else {
                setCurrentState(currentState + 1)
                number =  currentState + 1
                // console.log(number)
            }

            currentSpan[currentState].classList.remove('currentState-identify')
            currentSpan[number].classList.add('currentState-identify')

        }, 2000)

        return () => clearTimeout(timer)
    }, [currentState])

    const backgroundImageStyle = {
        backgroundImage: `url(${imageSlide[currentState].url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh'
    }

    const goToNext = (currentState) => {
        setCurrentState(currentState)
    }

    // Animation for login and register form  
    const container = document.querySelector('.login-content-right')
    const signUpLink = document.querySelector('.sign-up-link')
    const signInLink = document.querySelector('.sign-in-link')

    if (container || signInLink || signUpLink) {
        signUpLink.addEventListener('click', () => {
            container.classList.add('animate-sign-in')
            container.classList.remove('animate-sign-up')
        })
    
        signInLink.addEventListener('click', () => {
            container.classList.add('animate-sign-up')
            container.classList.remove('animate-sign-in')
        })
    }
    
    return (
        <div className='login-container'>
            <div style={backgroundImageStyle}></div>
            <NavBarCustomer />
            <div className='transparent-background'></div>
            <div className='login-content'>
                <div className='login-content-left'>
                    <div className='introduction'>
                        <h1>Welcome to Yummy Restaurant online system</h1>
                        <p>
                            The Yummy Restaurant Group Limited is a catering company. 
                            It has grown into one of the largest catering company in Hong Kong.  
                            The Group provides diversified services including Chinese Restaurants, 
                            Western Restaurants, Japanese Restaurants, Conveyor belt Sushi Restaurants, 
                            Fast Food Restaurants and etc.
                        </p>
                    </div>
                    <div className='change-image-btn'>
                        {
                            imageSlide.map((imageSlide, currentState) => (
                                <span key={currentState} onClick={() => goToNext(currentState)}></span>
                            ))
                        }
                    </div>
                </div>
                <div className='login-content-right'>
                    <RegisterForm/>
                    <LoginForm/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


