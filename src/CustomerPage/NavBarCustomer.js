import React from 'react'
import { Link } from 'react-router-dom';
import '../css/CustomerPage/NavBarCustomer.css'
import { toast } from 'react-toastify';

export default function TopNavBar() {

    const haveUsername = sessionStorage.getItem('username')

    const checkLogin = () => {
        if (!haveUsername) {
            toast.error("You need to login first")
            return false
        }
        return true
    }

    return (
        <div>
            <div className='nav-bar'>
                <Link className="brand">Yummy Food  <i className="fa-solid fa-utensils fa-xl"></i></Link>
                <div className='have-user'>
                    <p>{haveUsername ? <i className="fa-solid fa-user fa-xl"></i> : ""}</p>
                    <p>{haveUsername ? 'Hello, ' + haveUsername : "" }</p>
                </div>
                <ul>
                    <li><Link className='other-page' to='/IndexCustomer'>Home</Link></li>
                    <li><Link className='other-page' to='/FoodList'>Food List</Link></li>
                    <li><Link className='other-page' to='/OrderHistory' onClick={checkLogin}>Order History</Link></li>
                    <li><Link className='other-page log' to='/'>{haveUsername ? 'Logout' : 'Login'}</Link></li>
                </ul>
                <div className='toggle-btn'><i className="fa-solid fa-bars fa-xl"></i></div>
            </div>

            <div className='dropdown-menu open'>
                <ul>
                    <li><Link className='other-page' to='/IndexCustomer'>Home</Link></li>
                    <li><Link className='other-page' to='/FoodList'>Food List</Link></li>
                    <li><Link className='other-page' to='/OrderHistory' onClick={checkLogin}>Order History</Link></li>
                    <li><Link className='other-page log' to='/'>{haveUsername ? 'Logout' : 'Login'}</Link></li>
                </ul>
            </div>
        </div>
    )
}
