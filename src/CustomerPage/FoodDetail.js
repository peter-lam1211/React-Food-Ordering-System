import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBarCustomer from './NavBarCustomer'
import '../css/CustomerPage/FoodDetail.css'
import QuantityBtn from './QuantityBtn'
import ShoppingNavBar from './ShoppingNavBar'
import Footer from '../Footer'

export default function FoodDetail() {

    let params = useParams()
    let [foodDetail, setFoodDetail] = useState(null)

    useEffect(() => {

        fetch("http://" + window.location.host.split(":")[0] + ":8000/meal/" + params.id)
            .then( response => response.json() )
            .then( data => setFoodDetail(data) )

    }, [params.id])

    return (
        <>
            <NavBarCustomer/>
            <ShoppingNavBar title="Food Detail" destination="/FoodList" situation="Go Back To Food List"/>
            {
                foodDetail &&
                <div className='foodDetail-container'>
                    <div className='foodDetail-img'>
                        <img src={process.env.PUBLIC_URL + '/img/' + foodDetail.img} />
                    </div>
                    <div className='foodDetail-detail'>
                        <h2>{foodDetail.foodName}</h2>
                        <h3>{foodDetail.restaurant}</h3>
                        <p><i className="fa-solid fa-location-dot"></i> {foodDetail.address}</p>
                        <p><i className="fa-solid fa-truck"></i> {foodDetail.spendTime} min</p><br/>
                        <p><span><i className="fa-solid fa-money-bill-wave"></i> Price : </span>${foodDetail.price}</p>
                        <p><span><i className="fa-solid fa-tag"></i> Food Category : </span>{foodDetail.foodStyle}</p>
                        <QuantityBtn foodInfo={foodDetail}/>
                        <p className='foodDetail-element-last'><span><i className="fa-solid fa-comment"></i> Description :</span> {foodDetail.description}</p>
                    </div>
                </div>
            }
            <Footer position={'absolute'} bottom={'-20%'}/>
        </>
    )
}
