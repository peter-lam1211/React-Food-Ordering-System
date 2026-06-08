import '../css/CustomerPage/FoodList.css'
import React, { useEffect, useState } from 'react'
import NavBarCustomer from './NavBarCustomer'
import ShoppingNavBar from './ShoppingNavBar'
import { Link } from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import Footer from '../Footer'

export default function FoodList() {

    let [foodList, setFoodList] = useState([])
    let [foodStyle, setFoodStyle] = useState([])

    useEffect(() => {

        fetch("http://" + window.location.host.split(":")[0] + ":8000/meal")
            .then(response => response.json())
            .then(data => {
                setFoodList(data);
                setFoodStyle([...new Set(data.map(food => food.foodStyle))]);
            })

    }, [])

    const filterItems = (cat) => {

        fetch("http://" + window.location.host.split(":")[0] + ":8000/meal")
            .then(response => response.json())
            .then(data => {
                const newItems = data.filter(filterCat => filterCat.foodStyle === cat)
                setFoodList(newItems)
            })

    }

    const allItems = () => {

        fetch("http://" + window.location.host.split(":")[0] + ":8000/meal")
            .then(response => response.json())
            .then(data => {
                setFoodList(data)
            })

    }

    return (
        <>
            <NavBarCustomer />
            <ShoppingNavBar title="Food List" destination="/ShoppingCart" situation="Go To My Shopping Cart" />
            <div className='foodList-container'>
                <div className='foodList-category'>
                    <h2>Food Category</h2>
                    <ul>
                        {
                            foodStyle.map(foodStyle => (
                                <div key={foodStyle}>
                                    <ul><button onClick={() => filterItems(foodStyle)} className='category-btn'>{foodStyle}</button></ul>
                                </div>
                            ))
                        }
                        <button onClick={() => allItems()} className='category-btn'>All style</button>
                    </ul>
                </div>

                <div className='foodList-card-area'>
                    {
                        foodList.map((food) => (
                            <div key={food.id}>

                                <div className='foodList-card'>
                                    <div className='card-image'>
                                        <Link to={'/FoodDetail/' + food.id}>
                                            <img src={process.env.PUBLIC_URL + '/img/' + food.img} />
                                        </Link>
                                    </div>
                                    <div className='card-info'>
                                        <p className='card-info-title'>{food.foodName}</p>
                                        <p className='card-info-restaurant'>{food.restaurant}</p>
                                        <p className='card-info-deliveryFee'><i className="fa-solid fa-truck"></i> {food.spendTime} min</p>
                                    </div>
                                    <div className='card-footer'>
                                        <span className='card-price'>${food.price}</span>
                                        <QuantityBtn foodInfo={food} />
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer/>
        </>
    )
}

