import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ShoppingNavBar({ title, destination, situation }) {

    const haveUsername = sessionStorage.getItem('username')

    const checkLogin = () => {
        if (!haveUsername) {
            toast.error("You need to login first")
            return false
        }
        return true
    }

    const containerStyle = {
        display: 'flex',
        top: '12%',
        position: 'absolute',
        width: '98%',
        left: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
        background: '#d7d1d3',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
        marignBottom: '20px'
    }

    const linkStyle = {
        position: 'absolute',
        right: '30px',
        textDecoration: 'none',
        background: 'black',
        color: 'white',
        padding: '10px',
        borderRadius: '20px',
        transition: '.3s'
    }

    return (
        <div style={containerStyle}>
            <h1>{title}</h1>
            <Link
                className='shoppingNavBar-link'
                style={linkStyle}
                to={destination}
                onClick={checkLogin}
                onMouseEnter={() => document.querySelector('.shoppingNavBar-link').style.transform = 'translateY(-8px)'}
                onMouseLeave={() => document.querySelector('.shoppingNavBar-link').style.transform = 'none'}
            >{situation}</Link>
        </div>
    )
}
