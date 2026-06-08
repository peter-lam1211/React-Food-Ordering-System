import React, { useState, useEffect, useContext } from 'react'
import NavBarCustomer from './NavBarCustomer'
import { useNavigate, Link } from 'react-router-dom'
import ShoppingNavBar from './ShoppingNavBar'
import { CartContext } from "./CartContext"
import '../css/CustomerPage/ShoppingCart.css'
import QuantityBtn from './QuantityBtn'
import Footer from '../Footer'

export default function ShoppingCart() {

    const goLoginPage = useNavigate(); 

    useEffect(() => {
        let username = sessionStorage.getItem('username')
        if (username === "" || username === null) {
            goLoginPage("/")
        }
    }, [])

    let {cartItems} = useContext(CartContext)
    
    let cartEmpty = cartItems.length <= 0 ? true : false

    let totalPrice = cartItems.reduce(
        (total, food) => {
            return total += food.price * food.quantity
        }, 0
    )

    const freeShippingPrice = 600
    const platformFee = 5
    const deliveryFee = 25
    const orderDiscount = 0

    return (
        <>
            <NavBarCustomer/>
            <ShoppingNavBar title="My Shopping Cart" destination='/FoodList' situation="Go Back To Food List"/>

            {
                cartEmpty &&
                <div className='nullCart'>
                    <h1>Your shopping cart is cart!</h1><br/><br/>
                    <img src={process.env.PUBLIC_URL + '/img/nullCart_background.png'}/>
                </div>
            }

            {
                !cartEmpty && 
                <div className='shoppingCart-container'>
                    <div className='shoppingCart-mainContent'>
                        <table>
                            <tbody>
                                {
                                    cartItems.map(food => (
                                        <tr key={food.id} className='shoppingCart-element'>
                                            <td>
                                                <img src={process.env.PUBLIC_URL + '/img/' + food.img} style={{width: '200px'}} />
                                            </td>
                                            <td>
                                                <h3>{food.foodName}</h3>
                                                <p>{food.restaurant}</p>
                                                <p>${food.price}</p>
                                            </td>
                                            <td className='elementBtn'>
                                                <QuantityBtn foodInfo={food} />
                                            </td>
                                            <td className='foodSubTotal'>
                                                ${food.price * food.quantity}
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className='shoppingCart-preCheckout'>
                        <h2>ORDER SUMMARY</h2>

                        <div className='preCheckout-element'>
                            <p>Subtotal</p>
                            <p>${totalPrice}</p>
                        </div>

                        <div className='preCheckout-element'>
                            <p>Delivery Fee</p>
                            {
                                totalPrice >= freeShippingPrice ? 
                                <p>$0</p> :
                                <p>${deliveryFee} <small>/ per restaurant</small></p>
                            }
                        </div>

                        <div className='preCheckout-element'>
                            <p>Platform Fee</p>
                            <p>${platformFee}</p>
                        </div>

                        <div className='preCheckout-element'>
                            <p>Other Discount</p>
                            <p>${orderDiscount}</p>
                        </div>

                        <div className='preCheckout-element' style={{marginBottom: '2px'}}>
                            <h3>Total</h3>
                            <p>${totalPrice + platformFee - orderDiscount}</p>
                        </div>
                        <p style={{marginBottom: '20px'}}><small>(Not including delivery fee)</small></p>

                        {
                            totalPrice >= freeShippingPrice ?
                            <div className='preCheckout-freeShipping'><span className='preCheckout-reminder'>*You can be servered free delivery</span></div>
                            :
                            <div className='preCheckout-noShipping'><span className='preCheckout-reminder'>*You are ${freeShippingPrice - totalPrice} away from free shipping</span></div>
                        }

                        <div className='preCheckout-btn-area'>
                            <Link to='/Checkout' className='preCheckout-btn'>Checkout</Link>
                        </div>
                    </div>

                </div>
            }
            <Footer/>
        </>
    )
}
