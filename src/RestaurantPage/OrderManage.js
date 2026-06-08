import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import NavBarRestaurant from './NavBarRestaurant'
import '../css/RestaurantPage/OrderManage.css'
import LoadingEffect from './LoadingEffect'
import { toast } from 'react-toastify'
import Subheading from '../Subheading'

export default function OrderManage() {

    const goLoginPage = useNavigate();

    let userEmail = sessionStorage.getItem('userEmail')
    let username = sessionStorage.getItem('username')

    useEffect(() => {
        if (userEmail === "" || userEmail === null) {
            goLoginPage("/")
        }
    }, [])

    // Order management list session
    const [orderManageShow, setOrderManageShow] = useState([]);

    useEffect(() => {
        fetch(`http://${window.location.host.split(":")[0]}:8000/order`)
            .then(response => response.json())
            .then(jsonData => {
                const matchedOrders = jsonData.filter(item => {
                    return item.orderMeal.some(order => order.restaurant === username);
                });
                setOrderManageShow(matchedOrders);
            });
    }, []);

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
            case 'Ready':
                return '#dda0dd'
        }
    }

    const [orderID, setOrderID] = useState("")

    // Show order detail
    const [orderDetailShow, setOrderDetailShow] = useState(false)
    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        fetch(`http://${window.location.host.split(":")[0]}:8000/order?id=${orderID}`)
            .then(response => response.json())
            .then(jsonData => {
                setOrderDetail(jsonData)
            })
    }, [orderID])

    // Update order (pickup)
    const [updateOrderShow, setUpdateOrderShow] = useState(false)

    const updatePickupOrder = (e) => {
        e.preventDefault()

        let updatedStatus = { "status": "Ready" }

        fetch(`http://${window.location.host.split(":")[0]}:8000/order/${orderID}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStatus)
        }).then(() => {
            toast.success('Update successfully')

            fetch(`http://${window.location.host.split(":")[0]}:8000/order`)
                .then(response => response.json())
                .then(jsonData => {
                    const matchedOrders = jsonData.filter(item => {
                        return item.orderMeal.some(order => order.restaurant === username);
                    });
                    setOrderManageShow(matchedOrders);
                });

            setUpdateOrderShow(false)
        }).catch(() => {
            toast.error("Update unsuccessfully")
        });
    }

    return (
        <>
            <NavBarRestaurant />
            <div className='orderManage-container'>
                <Subheading title={'Order Management'} />
                <div className='orderManage-table'>
                    <div className='orderManage-table-heading'>
                        <div className='orderManage-table-cell'>
                            <p>Order ID</p>
                        </div>
                        <div className='orderManage-table-cell'>
                            <p>Order Date</p>
                        </div>
                        <div className='orderManage-table-cell'>
                            <p>Pickup Option</p>
                        </div>
                        <div className='orderManage-table-cell'>
                            <p>Status</p>
                        </div>
                        <div className='orderManage-table-cell'>
                            <p>Total Amount</p>
                        </div>
                        <div className='orderManage-table-cell'>
                            <p>Detail</p>
                        </div>
                        <div className='orderManage-table-cell'>
                            <p>Update</p>
                        </div>
                    </div>
                    {
                        orderManageShow.length > 0 && orderManageShow.map(order => (
                            <div className='orderManage-table-row' key={order.id}>
                                <div className='orderManage-table-cell'>
                                    <p>{order.id}</p>
                                </div>
                                <div className='orderManage-table-cell'>
                                    <p>{order.orderInfo.currentTime}</p>
                                </div>
                                <div className='orderManage-table-cell'>
                                    <p>{order.orderInfo.deliveryOption}</p>
                                </div>
                                <div className='orderManage-table-cell'>
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
                                <div className='orderManage-table-cell'>
                                    <p>${order.orderInfo.orderTotalAmount}</p>
                                </div>
                                <div className='orderManage-table-cell'>
                                    <button
                                        onClick={() => {
                                            setOrderDetailShow(true)
                                            setOrderID(order.id)
                                        }}
                                    ><i className="fa-solid fa-circle-info"></i></button>
                                </div>
                                <div className='orderManage-table-cell'>
                                    <button
                                        onClick={() => {
                                            if (order.orderInfo.deliveryOption === 'self pick-up' && order.status === 'Preparing') {
                                                setUpdateOrderShow(true)
                                                setOrderID(order.id)
                                            } else if (order.orderInfo.deliveryOption === 'delivery') {
                                                toast.warning("You only can update the order status with delivery option is 'self pick-up' !")
                                            }

                                            if (order.status === 'Ready') {
                                                toast.warning("The order is already finish !")
                                            }
                                        }}
                                    ><i className="fa-solid fa-marker"></i></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {
                orderDetailShow &&
                <div className='rest-orderDetail-container'>
                    <div className='rest-orderDetail-container-heading'>
                        <h2>Order Detail <span style={{color: '#4169e1'}}># {orderDetail.length !== 0 ? orderDetail[0].id : ''}</span></h2>
                        <button onClick={() => setOrderDetailShow(false)}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className='rest-orderDetail-container-mainContent'>
                        {
                            orderDetail.length !== 0 && (
                                <div>
                                    {
                                        orderDetail[0].orderInfo.deliveryOption === 'delivery' ? (
                                            orderDetail[0].deliveryPerson !== '' ? (
                                                <div className='rest-orderDetail-deliveryPerson'>
                                                    <p>
                                                        Delivery personnel ({orderDetail[0].deliveryPerson}) take this order{" "}
                                                        <i className="fa-solid fa-truck"></i>
                                                    </p>
                                                </div>
                                            ) : (
                                                <LoadingEffect />
                                            )
                                        ) : 
                                        <div className='rest-orderDetail-deliveryPerson'>
                                            No need delivery personnel for this order{" "}<i className="fa-solid fa-business-time"></i>
                                        </div>
                                    }
                                </div>
                            )
                        }
                        <hr style={{ marginBottom: '8px' }} />
                        {
                            orderDetail.length != 0 && orderDetail.map(order => (
                                <div className='rest-orderDetail-container-body' key={order.id}>
                                    <div className='rest-orderDetail-container-body-left'>
                                        {
                                            order.orderMeal.map(mealDetail => {
                                                if (mealDetail.restaurant === username) {
                                                    return (
                                                        <div className='rest-orderDetail-orderMeal-table-row' key={mealDetail.id}>
                                                            <div className='rest-orderDetail-orderMeal-table-cell'>
                                                                {mealDetail.foodName.slice(mealDetail.foodName.indexOf("(") + 1, mealDetail.foodName.indexOf(")"))}<br />
                                                            </div>
                                                            <div className='rest-orderDetail-orderMeal-table-cell'>
                                                                Qty: {mealDetail.quantity}
                                                            </div>
                                                            <div className='rest-orderDetail-orderMeal-table-cell'>
                                                                ${mealDetail.price}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        {
                                            orderDetail[0].orderInfo.restaurantNum > 1 ?
                                                (
                                                    <div className='rest-orderDetail-otherRest'>
                                                        <p>Other meal in other restaurants is not allowed to see <i className="fa-solid fa-circle-exclamation"></i></p>
                                                    </div>
                                                ) : null
                                        }

                                        <hr style={{ margin: '8px 0' }} />

                                        <div className='rest-orderDetail-orderMeal-data'>
                                            <p><strong>Subtotal</strong></p>
                                            {
                                                orderDetail[0].orderInfo.deliveryOption === 'delivery' ?
                                                    <p>${orderDetail[0].orderInfo.orderTotalAmount - 25 * orderDetail[0].orderInfo.restaurantNum - 5}</p>
                                                    :
                                                    <p>${orderDetail[0].orderInfo.orderTotalAmount - 5}</p>
                                            }
                                        </div>
                                        <div className='rest-orderDetail-orderMeal-data'>
                                            <p><strong>Delivery Fee</strong></p>
                                            {
                                                orderDetail[0].orderInfo.deliveryOption === 'delivery' ?
                                                <p>${25 * orderDetail[0].orderInfo.restaurantNum}</p>
                                                :
                                                <p>$0</p>
                                            }
                                        </div>
                                        <div className='rest-orderDetail-orderMeal-data'>
                                            <p><strong>Platform Fee</strong></p>
                                            <p>$5</p>
                                        </div>
                                        <div className='rest-orderDetail-orderMeal-data'>
                                            <p><strong>Other Discount</strong></p>
                                            <p>$0</p>
                                        </div>

                                        <hr style={{ marginBottom: '8px' }} />

                                        <div className='rest-orderDetail-orderMeal-data'>
                                            <p style={{ fontSize: '18px' }}><strong>Total</strong></p>
                                            <p style={{ fontSize: '18px' }}><strong>${orderDetail[0].orderInfo.orderTotalAmount}</strong></p>
                                        </div>

                                    </div>

                                    <div className='rest-orderDetail-container-body-right'>
                                        <div className='rest-orderDetail-data'>
                                            <p><strong>Order Time</strong></p>
                                            <p>{orderDetail[0].orderInfo.currentDate}</p>
                                        </div>

                                        <div className='rest-orderDetail-data'>
                                            <p><strong>Estimated Delivery Time</strong></p>
                                            <p>{orderDetail[0].orderInfo.estimateDeliveryTime} mins</p>
                                        </div>

                                        <div className='rest-orderDetail-data'>
                                            <p><strong>Payment Option</strong></p>
                                            <p>{orderDetail[0].orderInfo.paymentOption}</p>
                                        </div>

                                        <div className='rest-orderDetail-data'>
                                            <p><strong>Delivery Option</strong></p>
                                            <p>{orderDetail[0].orderInfo.deliveryOption}</p>
                                        </div>

                                        <div className='rest-orderDetail-data'>
                                            <p><strong>Delivery Address</strong></p>
                                            <p>
                                                {
                                                    orderDetail[0].orderInfo.fullAddress === " " || orderDetail[0].orderInfo.fullAddress === "" ?
                                                        <p>N/A</p>
                                                        :
                                                        <p style={{ textAlign: 'right' }}>{orderDetail[0].orderInfo.fullAddress}</p>
                                                }
                                            </p>
                                        </div>

                                        <div className='rest-orderDetail-data'>
                                            <p><strong>Name</strong></p>
                                            <p>
                                                {
                                                    orderDetail[0].orderInfo.fullName === " " || orderDetail[0].orderInfo.fullName === "" ?
                                                        <p>N/A</p>
                                                        :
                                                        <p>{orderDetail[0].orderInfo.fullName}</p>
                                                }
                                            </p>
                                        </div>

                                        <div className='rest-orderDetail-data'>
                                            <p><strong>Contact Number</strong></p>
                                            <p>
                                                {
                                                    orderDetail[0].orderInfo.phone === " " || orderDetail[0].orderInfo.phone === "" ?
                                                        <p>N/A</p>
                                                        :
                                                        <p>{orderDetail[0].orderInfo.phone}</p>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }

            {
                updateOrderShow &&
                <div className='rest-updateOrder-container' style={{width: '500px'}}>
                    <div className='rest-updateOrder-heading'>
                        <h2>Confirmation Message <i className="fa-solid fa-square-check"></i></h2>
                        <button onClick={() => setUpdateOrderShow(false)}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className='rest-updateOrder-mainContent'>
                        <div className='rest-updateOrder-mainContent-body'>
                            <h3>Do you confirm that the order <span style={{color: '#008000'}}># {orderID}</span> is finished with changing the status to <span style={{ color: 'red' }}>"Ready"</span> ?</h3>
                                <button onClick={(e) => updatePickupOrder(e)}>Update</button>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}
