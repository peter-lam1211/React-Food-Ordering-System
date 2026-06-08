import React, { useState, useEffect } from 'react'
import NavBarCustomer from './NavBarCustomer'
import { useNavigate } from 'react-router-dom'
import '../css/CustomerPage/OrderHistory.css'
import Footer from '../Footer'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { toast } from 'react-toastify'
import DeliveryProgress from '../DeliveryPage/DeliveryProgress'
import Subheading from '../Subheading'

export default function OrderHistory() {

    const goLoginPage = useNavigate();

    let userEmail = sessionStorage.getItem('userEmail')
    let userID = sessionStorage.getItem('userID')

    useEffect(() => {
        if (userEmail === "" || userEmail === null) {
            goLoginPage("/")
        }
    }, [])

    const [history, setHistory] = useState([])

    useEffect(() => {

        fetch(`http://` + window.location.host.split(":")[0] + `:8000/order?userID=${userID}`)
            .then(response => response.json())
            .then(jsonData => setHistory(jsonData))

    }, [])

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

    // Order Detail Session

    const [orderID, setOrderID] = useState('')
    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {

        fetch(`http://` + window.location.host.split(":")[0] + `:8000/order?id=${orderID}`)
            .then(response => response.json())
            .then(jsonData => setOrderDetail(jsonData))

    }, [orderID])

    const [orderDetailShow, setOrderDetailShow] = useState(false)

    // Feedback session

    const [feedbackShow, setFeedbackShow] = useState(false)

    const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
            color: theme.palette.action.disabled,
        },
    }));

    const customIcons = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon color="error" />,
            label: 'Very Dissatisfied',
        },
        2: {
            icon: <SentimentDissatisfiedIcon color="error" />,
            label: 'Dissatisfied',
        },
        3: {
            icon: <SentimentSatisfiedIcon color="warning" />,
            label: 'Neutral',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon color="success" />,
            label: 'Satisfied',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon color="success" />,
            label: 'Very Satisfied',
        },
    };

    function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }

    IconContainer.propTypes = {
        value: PropTypes.number.isRequired,
    };

    const submitFeedback = () => {
        toast.success("Submit Successfully")
        setFeedbackShow(false)
    }

    return (
        <>
            <NavBarCustomer />

            <div className='orderHistory-container'>
                <Subheading title={'Order History'} />

                <div className='orderHistory-table'>
                    <div className='table-row table-heading'>
                        <div className='table-cell'>
                            <p>OrderID</p>
                        </div>
                        <div className='table-cell'>
                            <p>Order Date</p>
                        </div>
                        <div className='table-cell'>
                            <p>Pickup Option</p>
                        </div>
                        <div className='table-cell'>
                            <p>Status</p>
                        </div>
                        <div className='table-cell'>
                            <p>Total Amount</p>
                        </div>
                        <div className='table-cell'>
                            <p>Detail</p>
                        </div>
                        <div className='table-cell'>
                            <p>Feedback</p>
                        </div>
                    </div>

                    {
                        history.length > 0 && history.map(order => (
                            <div className='table-row' key={order.id} style={{ fontSize: '16px' }}>
                                <div className='table-cell'>
                                    <p>{order.id}</p>
                                </div>
                                <div className='table-cell'>
                                    <p>{order.orderInfo.currentTime}</p>
                                </div>
                                <div className='table-cell'>
                                    <p>{order.orderInfo.deliveryOption}</p>
                                </div>
                                <div className='table-cell'>
                                    <p style={{
                                        backgroundColor: getStatusColor(order.status),
                                        color: 'white',
                                        fontWeight: 'bold',
                                        width: '80%',
                                        marginLeft: '10%',
                                        borderRadius: '15px',
                                        padding: '2px',
                                        boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2)'
                                    }}>
                                        {order.status}
                                    </p>
                                </div>
                                <div className='table-cell'>
                                    <p>${order.orderInfo.orderTotalAmount}</p>
                                </div>
                                <div className='table-cell'>
                                    <button
                                        className='table-cell-btn'
                                        onClick={() => {
                                            setOrderDetailShow(true)
                                            setOrderID(order.id)
                                        }}><i className="fa-solid fa-circle-info"></i></button>
                                </div>
                                <div className='table-cell'>
                                    <button
                                        className='table-cell-btn'
                                        onClick={() => setFeedbackShow(true)}><i className="fa-solid fa-comment"></i></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {
                orderDetailShow &&
                <div className='orderDetail-container'>
                    <div className='orderDetail-heading'>
                        <h2>Order Detail # {orderDetail.length !== 0 ? orderDetail[0].id : ''}</h2>
                        <button onClick={() => setOrderDetailShow(false)}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className='orderDetail-mainContent'>
                        <DeliveryProgress orderDetail={orderDetail} />

                        <hr style={{ marginBottom: '5px' }} />

                        <div className='orderDetail-real'>
                            <div className='real-orderMeal'>
                                {
                                    orderDetail.length > 0 && orderDetail.map((order) => (
                                        <div className='orderMeal-table' key={order.id}>
                                            {
                                                order.orderMeal.map(detail => (
                                                    <div className='orderMeal-table-row' key={detail.id}>
                                                        <div className='orderMeal-table-cell'>
                                                            <div style={{ textAlign: 'center' }}>
                                                                {detail.foodName.slice(detail.foodName.indexOf("(") + 1, detail.foodName.indexOf(")"))}<br />
                                                                <small>({detail.restaurant})</small>
                                                            </div>
                                                        </div>

                                                        <div className='orderMeal-table-cell'>
                                                            Qty: {detail.quantity}
                                                        </div>

                                                        <div className='orderMeal-table-cell'>
                                                            ${detail.price}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }

                                <hr style={{ marginTop: '8px' }} />

                                {
                                    orderDetail.length != 0 &&
                                    <div className='orderMeal-cost'>
                                        <div className='orderMeal-cost-detail'>
                                            <p><strong>Subtotal</strong></p>
                                            {
                                                orderDetail[0].orderInfo.deliveryOption === 'delivery' ?
                                                <p>${orderDetail[0].orderInfo.orderTotalAmount - 25 * orderDetail[0].orderInfo.restaurantNum - 5}</p> 
                                                :
                                                <p>${orderDetail[0].orderInfo.orderTotalAmount - 5}</p>
                                            }
                                        </div>

                                        <div className='orderMeal-cost-detail'>
                                            <p><strong>Delivery Fee</strong></p>
                                            {
                                                orderDetail[0].orderInfo.deliveryOption === 'delivery' ?
                                                <p>${25 * orderDetail[0].orderInfo.restaurantNum}</p>
                                                :
                                                <p>$0</p>
                                            }
                                        </div>

                                        <div className='orderMeal-cost-detail'>
                                            <p><strong>Platform Fee</strong></p>
                                            <p>$5</p>
                                        </div>

                                        <div className='orderMeal-cost-detail'>
                                            <p><strong>Other Discount</strong></p>
                                            <p>$0</p>
                                        </div>
                                    </div>
                                }

                                <hr style={{ marginTop: '8px' }} />

                                {
                                    orderDetail.length != 0 &&
                                    <div className='orderMeal-cost-detail'>
                                        <p style={{ fontSize: '18px' }}><strong>Total</strong></p>
                                        <p style={{ fontSize: '18px' }}><strong>${orderDetail[0].orderInfo.orderTotalAmount}</strong></p>
                                    </div>
                                }
                            </div>

                            {
                                orderDetail.length != 0 &&
                                <div className='real-orderInfo'>
                                    <div className='orderInfo-detail'>
                                        <p><strong>Delivery Personnel</strong></p>
                                        <p>
                                            {
                                                orderDetail[0].deliveryPerson === " " || orderDetail[0].deliveryPerson === "" ?
                                                    <p>N/A</p>
                                                    :
                                                    <p>{orderDetail[0].deliveryPerson}</p>
                                            }
                                        </p>
                                    </div>

                                    <div className='orderInfo-detail'>
                                        <p><strong>Order Time</strong></p>
                                        <p>{orderDetail[0].orderInfo.currentDate}</p>
                                    </div>

                                    <div className='orderInfo-detail'>
                                        <p><strong>Estimated Delivery Time</strong></p>
                                        <p>{orderDetail[0].orderInfo.estimateDeliveryTime} mins</p>
                                    </div>

                                    <div className='orderInfo-detail'>
                                        <p><strong>Payment Option</strong></p>
                                        <p>{orderDetail[0].orderInfo.paymentOption}</p>
                                    </div>

                                    <div className='orderInfo-detail'>
                                        <p><strong>Delivery Option</strong></p>
                                        <p>{orderDetail[0].orderInfo.deliveryOption}</p>
                                    </div>

                                    <div className='orderInfo-detail'>
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

                                    <div className='orderInfo-detail'>
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

                                    <div className='orderInfo-detail'>
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
                            }
                        </div>
                    </div>
                </div>
            }

            {
                feedbackShow &&
                <div className='feedback-container'>
                    <div className='feedback-heading'>
                        <h2>Customer Feedback <i className="fa-regular fa-face-laugh-wink"></i></h2>
                        <button onClick={() => setFeedbackShow(false)}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className='feedback-mainContent'>
                        <div className='feedback-question'>
                            <p>How satisfied are you with the accuracy of the order you received?</p>
                            <StyledRating
                                name="highlight-selected-only"
                                defaultValue={0}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[value].label}
                                highlightSelectedOnly
                            />
                        </div>

                        <div className='feedback-question'>
                            <p>How satisfied are you with the quality of the food you received?</p>
                            <StyledRating
                                name="highlight-selected-only"
                                defaultValue={0}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[value].label}
                                highlightSelectedOnly
                            />
                        </div>

                        <div className='feedback-question'>
                            <p>How satisfied are you with the overall ordering process on our online system?</p>
                            <StyledRating
                                name="highlight-selected-only"
                                defaultValue={0}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[value].label}
                                highlightSelectedOnly
                            />
                        </div>

                        <div className='feedback-question'>
                            <p>Do you have any suggestion for our system improvement?</p>
                            <textarea placeholder='write something...'></textarea>
                        </div>

                        <div className='feedback-btn'>
                            <button onClick={submitFeedback}>Submit</button>
                        </div>
                    </div>
                </div>
            }

            <Footer />
        </>
    )
}
