import React, { useEffect, useState } from 'react'
import NavBarDelivery from './NavBarDelivery'
import Footer from '../Footer'
import '../css/DeliveryPage/IndexDelivery.css'
import Chatbox from './Chatbox'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function IndexDelivery() {

    let username = sessionStorage.getItem('username')

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
    }, [])

    // Order pickup session
    const [availableOrder, setAvailableOrder] = useState([])

    useEffect(() => {
        fetch(`http://${window.location.host.split(":")[0]}:8000/order`)
            .then(response => response.json())
            .then(jsonData => setAvailableOrder(jsonData))
    }, [])

    // Available order
    const goSpecifyPage = useNavigate()

    const [showAvailableOrder, setShowAvailableOrder] = useState(false)
    const [orderID, setOrderID] = useState("")
    const [availableOrderDetail, setAvailableOrderDetail] = useState([])

    useEffect(() => {
        fetch(`http://${window.location.host.split(":")[0]}:8000/order?id=${orderID}`)
            .then(response => response.json())
            .then(jsonData => setAvailableOrderDetail(jsonData))
    }, [orderID])

    const addDeliveryPersonal = () => {
        const deliveryPerson = username
        let deliveryPersonalObj = { deliveryPerson }

        fetch(`http://${window.location.host.split(":")[0]}:8000/order/${orderID}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deliveryPersonalObj)
        }).then(() => {
            toast.success('Take ordered successfully')
            setShowAvailableOrder(false)
            goSpecifyPage('/PickupOrderHistory')
        }).catch(() => {
            toast.error("Take ordered unsuccessfully")
        });
    }

    return (
        <>
            <NavBarDelivery />
            <div className='delivery-mainContent'>
                <div className='delivery-heading'>
                    <h2>Hello, wellcome back !</h2>
                    <div className='delivery-heading-date-time'>
                        <h2>Time : {time.toLocaleTimeString()}</h2>
                        <h2>Date : {time.toLocaleDateString()}</h2>
                    </div>
                </div>
                <div className='rest-card-area'>
                    <div className='rest-card'>
                        <div className='rest-card-content'>
                            <div className='rest-card-number'>5</div>
                            <div className='rest-card-name'>Available pickup order (today)</div>
                        </div>
                        <div className='rest-icon-box'>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                    <div className='rest-card'>
                        <div className='rest-card-content'>
                            <div className='rest-card-number'>34</div>
                            <div className='rest-card-name'>Accumulated received order (today)</div>
                        </div>
                        <div className='rest-icon-box'>
                            <i className="fa-regular fa-hand-peace"></i>
                        </div>
                    </div>
                    <div className='rest-card'>
                        <div className='rest-card-content'>
                            <div className='rest-card-number'>20 km</div>
                            <div className='rest-card-name'>Accumulated distance (today)</div>
                        </div>
                        <div className='rest-icon-box'>
                            <i className="fa-solid fa-person-walking"></i>
                        </div>
                    </div>
                    <div className='rest-card'>
                        <div className='rest-card-content'>
                            <div className='rest-card-number'>$879.5</div>
                            <div className='rest-card-name'>Accumulated earnings (today)</div>
                        </div>
                        <div className='rest-icon-box'>
                            <i className="fa-solid fa-money-check-dollar"></i>
                        </div>
                    </div>
                </div>
                <div className='delivery-pickup-area'>
                    <div className='delivery-pickup-order-list'>
                        <h2>Available Pickup Order List</h2>
                        <div className='delivery-pickup-order'>
                            {availableOrder.length > 0 &&
                                availableOrder.map(order => {
                                    if (order.deliveryPerson === '' && order.orderInfo.deliveryOption === 'delivery' && order.status === 'Preparing') {
                                        return (
                                            <div className='pickup-order-row' key={order.id}>
                                                <div>
                                                    <p><strong>Order ID : </strong>{order.id}</p>
                                                    <p><strong>Required delivery time : </strong>{order.orderInfo.estimateDeliveryTime} mins</p>
                                                    <p><strong>Pickup restaurant : </strong>{order.orderInfo.restaurantNum}</p>
                                                    <p><strong>Estimated pickup time : </strong>{order.orderInfo.estimateDeliveryTime - 3} mins</p>
                                                </div>
                                                <div className='pickup-order-row-detail'>
                                                    <button
                                                        onClick={() => {
                                                            setOrderID(order.id)
                                                            setShowAvailableOrder(true)
                                                        }}
                                                    ><i className="fa-solid fa-circle-info"></i></button>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                        </div>
                    </div>
                    <div className='delivery-address-direction'>
                        <h2>Delivery Address Direction</h2>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d11988.922110518564!2d114.08962643640416!3d22.35273583921716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d22.342682399999998!2d114.10736469999999!4m5!1s0x3403f9612f186569%3A0x7370bd9016750635!2z6Z2S6KGj5ouF5p2G5bGx6LevMTAw6Jmf6aaZ5riv5rC05rOl5bug5riv6IiI6ZqG57i96YOo!3m2!1d22.3618371!2d114.0883484!5e0!3m2!1szh-TW!2shk!4v1701057292553!5m2!1szh-TW!2shk" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>

            {
                showAvailableOrder &&
                <div className='availableOrder-container'>
                    <div className='availableOrder-heading'>
                        <h2>Order Info</h2>
                        <button onClick={() => setShowAvailableOrder(false)}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className='availableOrder-mainContent'>
                        {
                            availableOrderDetail.length > 0 &&
                                availableOrderDetail.map(order => (
                                    <div className='availableOrder-row' key={order.id}>
                                        <p><strong>Order ID : </strong>{order.id}</p>
                                        <p><strong>Delivery address : </strong>{order.orderInfo.fullAddress}</p>
                                        <p><strong>Required delivery time : </strong>{order.orderInfo.estimateDeliveryTime} mins</p>
                                        <p><strong>Restaurant number : </strong>{order.orderInfo.restaurantNum}</p>
                                        <p style={{color: 'blue'}}><strong>Earning : ${25 * order.orderInfo.restaurantNum}</strong></p>
                                        <hr style={{ margin: '10px 0' }} />
                                        <p style={{color: 'red'}}><small>*please take a screenshot for easy take your order</small></p>
                                        {
                                            Array.from(new Set(order.orderMeal.map(orderMeal => orderMeal.restaurant))).map((restaurantName, restaurantIndex) => (
                                                <div key={restaurantName} style={{paddingBottom: '15px'}}>
                                                    <p><strong>Restaurant {restaurantIndex + 1} : </strong>{restaurantName}</p>
                                                    <p><strong>Address {restaurantIndex + 1} : </strong>{order.orderMeal.find(orderMeal => orderMeal.restaurant === restaurantName).address}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            )
                        }
                        <div className='availableOrder-btn'>
                            <button
                                onClick={addDeliveryPersonal}
                            >Take Order</button>
                        </div>
                    </div>
                </div>
            }

            <Chatbox />
            <Footer />
        </>
    )
}
