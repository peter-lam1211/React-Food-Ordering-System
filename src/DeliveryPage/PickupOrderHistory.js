import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBarDelivery from './NavBarDelivery'
import Footer from '../Footer'
import '../css/DeliveryPage/PickupOrderHistory.css'
import Chatbox from './Chatbox'
import { toast } from 'react-toastify'
import DeliveryProgress from './DeliveryProgress'
import Subheading from '../Subheading'

export default function PickupOrderHistory() {

    const goLoginPage = useNavigate();

    let userEmail = sessionStorage.getItem('userEmail')
    let username = sessionStorage.getItem('username')

    useEffect(() => {
        if (userEmail === "" || userEmail === null) {
            goLoginPage("/")
        }
    }, [])

    // Pickup order list session 
    const [pickupOrderListShow, setPickupOrderListShow] = useState([])

    useEffect(() => {
        fetch(`http://${window.location.host.split(":")[0]}:8000/order?deliveryPerson=${username}`)
            .then(response => response.json())
            .then(jsonData => setPickupOrderListShow(jsonData))
    }, [])

    const [orderID, setOrderID] = useState('')

    function getStatusColor(status) {
        switch (status) {
            case 'Preparing':
                return '#9cb028';
            case 'Pickup':
                return '#3f76d3';
            case 'Deliverying':
                return '#e5a72b';
            case 'Arrive':
                return '#2ac177';
        }
    }

    // Pickup order detail session
    const [pickupOrderShow, setPickupOrderShow] = useState(false)
    const [pickupOrderDetail, setPickupOrderDetail] = useState([])

    // Update order session (delivery)
    const [updateOrderShow, setUpdateOrderShow] = useState(false)
    const [updateOrder, setUpdateOrder] = useState([])

    useEffect(() => {
        fetch(`http://${window.location.host.split(":")[0]}:8000/order?id=${orderID}`)
            .then(response => response.json())
            .then(jsonData => {
                setUpdateOrder(jsonData)
                setPickupOrderDetail(jsonData)
            })
    }, [orderID])

    const updateToPickup = (e) => {
        e.preventDefault()

        let updatedStatus = { "status": "Pickup" }

        fetch(`http://${window.location.host.split(":")[0]}:8000/order/${orderID}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStatus)
        }).then(() => {
            toast.success('Update successfully')

            fetch(`http://${window.location.host.split(":")[0]}:8000/order?deliveryPerson=${username}`)
                .then(response => response.json())
                .then(jsonData => setPickupOrderListShow(jsonData))

            setTimeout(()=>{window.location.href = window.location.href}, 500)
            setUpdateOrderShow(false)
        }).catch(() => {
            toast.error("Update unsuccessfully")
        });
    }

    const updateToDeliverying = (e) => {
        e.preventDefault()

        let updatedStatus = { "status": "Deliverying" }

        fetch(`http://${window.location.host.split(":")[0]}:8000/order/${orderID}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStatus)
        }).then(() => {
            toast.success('Update successfully')

            fetch(`http://${window.location.host.split(":")[0]}:8000/order?deliveryPerson=${username}`)
                .then(response => response.json())
                .then(jsonData => setPickupOrderListShow(jsonData))

            setTimeout(()=>{window.location.href = window.location.href}, 500)
            setUpdateOrderShow(false)
        }).catch(() => {
            toast.error("Update unsuccessfully")
        });
    }

    const updateToArrive = (e) => {
        e.preventDefault()

        let updatedStatus = { "status": "Arrive" }

        fetch(`http://${window.location.host.split(":")[0]}:8000/order/${orderID}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStatus)
        }).then(() => {
            toast.success('Update successfully')

            fetch(`http://${window.location.host.split(":")[0]}:8000/order?deliveryPerson=${username}`)
                .then(response => response.json())
                .then(jsonData => setPickupOrderListShow(jsonData))

            setTimeout(()=>{window.location.href = window.location.href}, 500)
            setUpdateOrderShow(false)
        }).catch(() => {
            toast.error("Update unsuccessfully")
        });
    }

    return (
        <>
            <NavBarDelivery />
            <div className='poHistory-container'>
                <Subheading title={'Pickup Order History'} />

                <div className='poHistory-table'>
                    <div className='poHistory-table-heading'>
                        <div className='poHistory-table-cell'>
                            <p>Order ID</p>
                        </div>
                        <div className='poHistory-table-cell'>
                            <p>Order Time</p>
                        </div>
                        <div className='poHistory-table-cell'>
                            <p>Order Date</p>
                        </div>
                        <div className='poHistory-table-cell'>
                            <p>Status</p>
                        </div>
                        <div className='poHistory-table-cell'>
                            <p>Total amount</p>
                        </div>
                        <div className='poHistory-table-cell'>
                            <p>Detail</p>
                        </div>
                        <div className='poHistory-table-cell'>
                            <p>Update</p>
                        </div>
                    </div>
                </div>
                {
                    pickupOrderListShow.length > 0 && pickupOrderListShow.map(order => (
                        <div className='poHistory-table-row' key={order.id}>
                            <div className='poHistory-table-cell'>
                                <p>{order.id}</p>
                            </div>
                            <div className='poHistory-table-cell'>
                                <p>{order.orderInfo.currentDate}</p>
                            </div>
                            <div className='poHistory-table-cell'>
                                <p>{order.orderInfo.currentTime}</p>
                            </div>
                            <div className='poHistory-table-cell'>
                                <p style={{
                                    backgroundColor: getStatusColor(order.status),
                                    color: 'white',
                                    fontWeight: 'bold',
                                    width: '80%',
                                    marginLeft: '10%',
                                    borderRadius: '15px',
                                    padding: '2px',
                                    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2)'
                                }}
                                >{order.status}</p>
                            </div>
                            <div className='poHistory-table-cell'>
                                <p>${order.orderInfo.orderTotalAmount}</p>
                            </div>
                            <div className='poHistory-table-cell'>
                                <button
                                    onClick={() => {
                                        setPickupOrderShow(true)
                                        setOrderID(order.id)
                                    }}
                                ><i className="fa-solid fa-circle-info"></i></button>
                            </div>
                            <div className='poHistory-table-cell'>
                                <button
                                    onClick={() => {
                                        if (order.status != 'Arrive') {
                                            setUpdateOrderShow(true)
                                            setOrderID(order.id)
                                        } else {
                                            toast.warning("The order is already finish!")
                                        }
                                    }}
                                ><i className="fa-solid fa-marker"></i></button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                pickupOrderShow &&
                <div className='pickupOrder-detail'>
                    <div className='pickupOrder-detail-heading'>
                        <h2>Pickup Order Detail <span style={{color: '#008000'}}># {pickupOrderDetail.length !== 0 ? pickupOrderDetail[0].id : ''}</span></h2>
                        <button onClick={() => setPickupOrderShow(false)}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className='pickupOrder-detail-mainContent'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3962.20074628409!2d114.13760018387316!3d22.286362573322364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e9!4m3!3m2!1d22.2848948!2d114.13657669999999!4m5!1s0x3403ff86b6cc278b%3A0xc314a7f85b694e32!2z6KW_55Kw5rC06KGXNDPomZ_lt7Tkvp3ppJDlu7M!3m2!1d22.2852122!2d114.13911379999999!5e0!3m2!1szh-TW!2shk!4v1701515709049!5m2!1szh-TW!2shk" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <DeliveryProgress orderDetail={pickupOrderDetail} />

                        <hr />

                        <div className='pickupOrder-detail-body'>
                            {
                                pickupOrderDetail.length != 0 &&
                                <div className='pickupOrder-detail-body-left'>
                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Order Subtotal</strong></p>
                                        {
                                            pickupOrderDetail[0].orderInfo.deliveryOption === 'delivery' ?
                                            <p>${pickupOrderDetail[0].orderInfo.orderTotalAmount - 25 * pickupOrderDetail[0].orderInfo.restaurantNum - 5}</p>
                                            :
                                            <p>${pickupOrderDetail[0].orderInfo.orderTotalAmount - 5}</p>
                                        }
                                    </div>

                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Delivery Fee</strong></p>
                                        <p>${25 * pickupOrderDetail[0].orderInfo.restaurantNum}</p>
                                    </div>

                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Platform Fee</strong></p>
                                        <p>$5</p>
                                    </div>

                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Other Discount</strong></p>
                                        <p>$0</p>
                                    </div>

                                    <hr style={{ marginTop: '8px' }} />

                                    <div className='pickupOrder-detail-data'>
                                        <p style={{ fontSize: '18px' }}><strong>Order Total</strong></p>
                                        <p style={{ fontSize: '18px' }}><strong>${pickupOrderDetail[0].orderInfo.orderTotalAmount}</strong></p>
                                    </div>
                                </div>
                            }

                            {
                                pickupOrderDetail.length != 0 &&
                                <div className='pickupOrder-detail-body-right'>
                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Delivery Personnel</strong></p>
                                        <p>{pickupOrderDetail[0].deliveryPerson}</p>
                                    </div>

                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Estimated Delivery Time</strong></p>
                                        <p>{pickupOrderDetail[0].orderInfo.estimateDeliveryTime} mins</p>
                                    </div>

                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Payment Option</strong></p>
                                        <p>{pickupOrderDetail[0].orderInfo.paymentOption}</p>
                                    </div>

                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Delivery Option</strong></p>
                                        <p>{pickupOrderDetail[0].orderInfo.deliveryOption}</p>
                                    </div>

                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Delivery Address</strong></p>
                                        <p>
                                            {
                                                pickupOrderDetail[0].orderInfo.fullAddress === " " || pickupOrderDetail[0].orderInfo.fullAddress === "" ?
                                                    <p>N/A</p>
                                                    :
                                                    <p style={{ textAlign: 'right' }}>{pickupOrderDetail[0].orderInfo.fullAddress}</p>
                                            }
                                        </p>
                                    </div>

                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Name</strong></p>
                                        <p>
                                            {
                                                pickupOrderDetail[0].orderInfo.fullName === " " || pickupOrderDetail[0].orderInfo.fullName === "" ?
                                                    <p>N/A</p>
                                                    :
                                                    <p>{pickupOrderDetail[0].orderInfo.fullName}</p>
                                            }
                                        </p>
                                    </div>

                                    <div className='pickupOrder-detail-data'>
                                        <p><strong>Contact Number</strong></p>
                                        <p>
                                            {
                                                pickupOrderDetail[0].orderInfo.phone === " " || pickupOrderDetail[0].orderInfo.phone === "" ?
                                                    <p>N/A</p>
                                                    :
                                                    <p>{pickupOrderDetail[0].orderInfo.phone}</p>
                                            }
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }

            {
                updateOrderShow &&
                <div className='updatePO-detail' style={{ width: '500px' }}>
                    <div className='updatePO-detail-heading'>
                        <h2>Confirmation Message <i className="fa-solid fa-square-check"></i></h2>
                        <button onClick={() => setUpdateOrderShow(false)}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>
                    
                    <div className='updatePO-detail-mainContent'>
                        {
                            updateOrder.length > 0 && updateOrder.map(order => {
                                if (order.status === 'Preparing') {
                                    return (
                                        <div className='updatePO-detail-mainContent-body' key={order.id}>
                                            <h3>Do you confirm that the status of order <span style={{color: '#008000'}}># {order.id}</span> should be updated from <span style={{ color: 'red' }}>"Preparing"</span> to <span style={{ color: 'red' }}>"Pickup"</span> ?</h3>
                                            <button
                                                onClick={(e) => updateToPickup(e)}
                                            >Update</button>
                                        </div>
                                    );
                                } else if (order.status === 'Pickup') {
                                    return (
                                        <div className='updatePO-detail-mainContent-body' key={order.id}>
                                            <h3>Do you confirm that the status of order <span style={{color: '#008000'}}># {order.id}</span> should be updated from <span style={{ color: 'red' }}>"Pickup"</span> to <span style={{ color: 'red' }}>"Delivering"</span> ?</h3>
                                            <button
                                                onClick={(e) => updateToDeliverying(e)}
                                            >Update</button>
                                        </div>
                                    );
                                } else if (order.status === 'Deliverying') {
                                    return (
                                        <div className='updatePO-detail-mainContent-body' key={order.id}>
                                            <h3>Do you confirm that the order <span style={{color: '#008000'}}># {order.id}</span> is finished with changing the status to <span style={{ color: 'red' }}>"Arrive"</span> ?</h3>
                                            <button
                                                onClick={(e) => updateToArrive(e)}
                                            >Update</button>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
            }
            <Chatbox />
            <Footer />
        </>
    )
}
