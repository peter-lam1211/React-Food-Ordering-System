import React, { useContext, useState } from 'react'
import { CartContext } from "./CartContext"
import '../css/CustomerPage/QuantityBtn.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

export default function QuantityBtn({foodInfo}) {

    const {cartItems, setCartItems} = useContext(CartContext)

    let foodIndexInCart = cartItems.findIndex(
        element => element.id === foodInfo.id
    )

    let [numInCart, setNumInCart] = useState(
        (foodIndexInCart === -1) ? 0 : cartItems[foodIndexInCart].quantity
    )

    const haveUsername = sessionStorage.getItem('username')
    const GoToLogin = useNavigate()

    const checkLogin = () => {
        if (!haveUsername) {
            toast.error("You need to login first")
            GoToLogin('/')
            return false
        }
        return true
    }
 
    const handleAdd = () => {

        if (!checkLogin()) {
            return
        }

        if ( foodIndexInCart === -1 ) {
            setCartItems(
                [{
                    id: foodInfo.id,
                    foodName: foodInfo.foodName,
                    restaurant: foodInfo.restaurant,
                    address: foodInfo.address,
                    img: foodInfo.img,
                    foodStyle: foodInfo.foodStyle,
                    price: foodInfo.price,
                    spendTime: foodInfo.spendTime,
                    description: foodInfo.description,
                    quantity: 1
                }, ...cartItems]
            )
        }
        else {
            let newCartArray = [...cartItems]
            newCartArray[foodIndexInCart].quantity++
            setCartItems(newCartArray)
        }

        setNumInCart(numInCart + 1)
    }

    const handleSubtract = () => {

        if (!checkLogin()) {
            return
        }

        if(cartItems[foodIndexInCart].quantity === 1) {

            let newCartArray = [...cartItems]
            newCartArray.splice(foodIndexInCart, 1)
            setCartItems(newCartArray)

        } else {

            let newCartArray = [...cartItems]
            newCartArray[foodIndexInCart].quantity--
            setCartItems(newCartArray)

        }

        setNumInCart(numInCart - 1)
    }
    
    return (
        <div className='addToCart'>
            {
                (numInCart === 0) ?
                <button className='addToCartBtn' onClick={handleAdd}>
                    Add To Cart <i className="fa-solid fa-cart-shopping fa-lg"></i>
                </button> 
                :
                <div>
                    <button className='subtractBtn' onClick={handleSubtract}>-</button>
                    <span className='numInCart'>{numInCart}</span>
                    <button className='addBtn' onClick={handleAdd}>+</button>
                </div>
            }
        </div>
    )
}
