import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBarRestaurant() {

    const haveUsername = sessionStorage.getItem('username')

    return (
        <div>
            <div className='nav-bar' style={{background: '#4169e1'}}>
                <Link className="brand">Yummy Food  <i className="fa-solid fa-utensils fa-xl"></i></Link>
                <div className='have-user'>
                    <p>{haveUsername ? <i className="fa-solid fa-user fa-xl"></i> : ""}</p>
                    <p>{haveUsername ? 'Hello, ' + haveUsername : "" }</p>
                </div>
                <ul>
                    <li><Link className='other-page' to='/IndexRestaurant'>Dashboard</Link></li>
                    <li><Link className='other-page' to='/MenuItem'>Menu Item</Link></li>
                    <li><Link className='other-page' to='/OrderManage'>Order</Link></li>
                    <li><Link className='other-page log' to='/'>Logout</Link></li>
                </ul>
                <div className='toggle-btn'><i className="fa-solid fa-bars fa-xl"></i></div>
            </div>

            <div className='dropdown-menu open'>
                <ul>
                    <li><Link className='other-page' to=''>Dashboard</Link></li>
                    <li><Link className='other-page' to=''>Menu Item</Link></li>
                    <li><Link className='other-page' to=''>Order</Link></li>
                    <li><Link className='other-page log' to='/'>Logout</Link></li>
                </ul>
            </div>
        </div>
    )
}
