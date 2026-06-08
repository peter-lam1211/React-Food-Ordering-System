import React, { useState, useEffect } from 'react';
import NavBarCustomer from './NavBarCustomer'
import '../css/CustomerPage/IndexCustomer.css'
import { Link } from 'react-router-dom';
import Footer from '../Footer'

export default function IndexCustomer() {

    const backgroundImageStyle = {
        backgroundImage: 'url(./img/first_element_background.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh'
    }

    return (
        <div>
            <NavBarCustomer />
            <div className='first-element' style={backgroundImageStyle}>
                <div className='first-element-content'>
                    <h3>Food Made With Love</h3>
                    <p>
                        Indulge in our online food ordering system, where every dish is prepared with love. 
                        Explore a diverse menu of flavors and savor the taste of our "Food Made With Love" promotion. 
                        Order now for a delightful culinary experience delivered to your doorstep.
                    </p>
                    <Link className='order-btn' to="/FoodList">Order Now</Link>
                </div>

                <div className='first-element-img'>
                    <img src='./img/first_element_img.png'></img>
                </div>
            </div>

            <div className='second-element'>
                <h1 className='element-head'>Our Kind Of Food</h1>

                <div className='box-container'>

                    <div className='box-element'>
                        <img className='box-element-img' src='./img/second_element_img1.png'></img>
                        <div className='box-element-content'>
                            <img src='./img/second_element_background1.png'></img>
                            <h3>Fast Food</h3>
                            <p>
                                Discover our mouthwatering hamburgers, crafted with premium ingredients and bursting with flavor. 
                                Order now and satisfy your cravings!
                            </p>
                        </div>
                    </div>

                    <div className='box-element'>
                        <img className='box-element-img' src='./img/second_element_img2.png'></img>
                        <div className='box-element-content'>
                            <img src='./img/second_element_background2.png'></img>
                            <h3>HK's Style Food</h3>
                            <p>
                                Delicious, oven-fresh pizzas crafted with love, topped with premium ingredients for an unforgettable 
                                taste experience
                            </p>
                        </div>
                    </div>

                    <div className='box-element'>
                        <img className='box-element-img' src='./img/second_element_img3.png'></img>
                        <div className='box-element-content'>
                            <img src='./img/second_element_background3.png'></img>
                            <h3>Chinese Food</h3>
                            <p>
                                Experience authentic Chinese cuisine with our diverse menu featuring mouthwatering flavors and traditional 
                                recipes. Order online now!
                            </p>
                        </div>
                    </div>

                    <div className='box-element'>
                        <img className='box-element-img' src='./img/second_element_img4.png'></img>
                        <div className='box-element-content'>
                            <img src='./img/second_element_background4.png'></img>
                            <h3>Western Food</h3>
                            <p>
                                Experience the rich flavors and culinary finesse of our Western cuisine, crafted with passion and served 
                                to perfection.
                            </p>
                        </div>
                    </div>

                    <div className='box-element'>
                        <img className='box-element-img' src='./img/second_element_img5.png'></img>
                        <div className='box-element-content'>
                            <img src='./img/second_element_background5.png'></img>
                            <h3>Japanese Food</h3>
                            <p>
                                Delicious, oven-fresh pizzas crafted with love, topped with premium ingredients for an unforgettable 
                                taste experience
                            </p>
                        </div>
                    </div>

                    <div className='box-element'>
                        <img className='box-element-img' src='./img/second_element_img6.png'></img>
                        <div className='box-element-content'>
                            <img src='./img/second_element_background6.png'></img>
                            <h3>Tasty Dessert</h3>
                            <p>
                                Delicious, oven-fresh pizzas crafted with love, topped with premium ingredients for an unforgettable 
                                taste experience
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* <div className='thrid-element'>
                <h1 className='element-head'>Our Popular Meal In Different Restaurant</h1>

                <div className='promote-container'>

                    <div className='promote-element'>
                        <span className='promote-element-price'> $30 - $40 </span>
                        <img src=''></img>
                        <h3>Mos Burger</h3>
                        <div className='promote-element-stars'>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='far fa-star'></i>
                        </div>
                        <Link className='order-btn' to="/FoodList">Order Now</Link>
                    </div>

                </div>
            </div> */}
            <Footer/>
        </div>
    )
}
