import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NavBarCustomer from './NavBarCustomer'
import ShoppingNavBar from './ShoppingNavBar'
import '../css/CustomerPage/Checkout.css'
import { CartContext } from "./CartContext"
import Footer from '../Footer'
import { toast } from 'react-toastify'

export default function Checkout() {

    const goSpecifyPage = useNavigate();

    let username = sessionStorage.getItem('username')
    let userEmail = sessionStorage.getItem('userEmail')
    let userID = sessionStorage.getItem('userID')

    useEffect(() => {
        if (username === "" || username === null) {
            goSpecifyPage("/")
        }
    }, [])

    const labelStyle = {
        backgroundColor: '#eeeeed'
    }

    let { cartItems, setCartItems } = useContext(CartContext)

    const clearCart = () => setCartItems([])

    // Session 1

    const [uniqueRestaurantsArray, setUniqueRestaurantsArray] = useState([]);
    let restaurantNum = 0

    useEffect(() => {

        let uniqueRestaurants = {};

        cartItems.forEach(item => {
            const { restaurant, address } = item;
            const key = `${restaurant}-${address}`;

            if (!uniqueRestaurants[key]) {
                uniqueRestaurants[key] = { restaurant, address };
            }
        });

        setUniqueRestaurantsArray(Object.values(uniqueRestaurants));
    }, [])


    let totalPrice = cartItems.reduce(
        (total, food) => {
            return total += food.price * food.quantity
        }, 0
    )

    const freeShippingPrice = 600
    const deliveryFee = 25
    const platformFee = 5
    const orderDiscount = 0

    // Session 2

    const [deliveryOption, setDeliveryoption] = useState('delivery')

    let calDeliveryTime = cartItems.reduce(
        (total, food) => {
            return total += food.spendTime
        }, 0
    )

    let region = ['Hong Kong Island', 'Kowloon', 'New Territories']
    let district = [
        'Central and Western', 'Eastern', 'Southern', 'Wan Chai', 'Sham Shui Po', 'Kowloon City',
        'Kwun Tong', 'Wong Tai Sin', 'Yau Tsim Mong', 'Islands', 'Kwai Tsing', 'North', 'Sai Kung',
        'Sha Tin', 'Tai Po', 'Tsuen Wan', 'Tuen Mun', 'Yuen Long'
    ]

    const showRegion = () => {
        const btn = document.querySelector('#dropdown-btn1')
        const option = document.querySelector('#input-option1')
        btn.classList.toggle('active')
        option.style.display = option.style.display === 'block' ? 'none' : 'block';
    }

    const showDistrict = () => {
        const btn = document.querySelector('#dropdown-btn2')
        const option = document.querySelector('#input-option2')
        btn.classList.toggle('active')
        option.style.display = option.style.display === 'block' ? 'none' : 'block';
    }

    const closeRegion = () => {
        const btn = document.querySelector('#dropdown-btn1')
        const option = document.querySelector('#input-option1')
        btn.classList.remove('active')
        option.style.display = option.style.display === 'block' ? 'none' : 'block';
    }

    const closeDistrict = () => {
        const btn = document.querySelector('#dropdown-btn2')
        const option = document.querySelector('#input-option2')
        btn.classList.remove('active')
        option.style.display = option.style.display === 'block' ? 'none' : 'block';
    }

    let estimateDeliveryTime = Math.ceil(calDeliveryTime / cartItems.length)

    const [inputEnable, setInputEnable] = useState(true)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [deliveryAdress, setDeliveryAdress] = useState("")

    const [regionSelect, setRegionSelect] = useState("")
    const [districtSelect, setDistrictSelect] = useState("")

    const [firstNameStyle, setFirstNameStyle] = useState({})
    const [lastNameStyle, setLastNameStyle] = useState({})
    const [phoneStyle, setPhoneStyle] = useState({})
    const [addressStyle, setAddressStyle] = useState({})

    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("")
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState("")
    const [phoneErrorMsg, setPhoneErrorMsg] = useState("")
    const [addressErrorMsg, setAddressErrorMsg] = useState("")

    let isOrderInputVaild = true

    const isFirstNameValid = () => {
        if (firstName === "" || firstName === null) {
            setFirstNameStyle({ border: '2px solid red' })
            setFirstNameErrorMsg("The first name cannot be empty")
            isOrderInputVaild = false
        } else {
            setFirstNameStyle({ border: '2px solid green' })
            setFirstNameErrorMsg("")
            isOrderInputVaild = true
        }
    }

    const isLastNameValid = () => {
        if (lastName === "" || lastName === null) {
            setLastNameStyle({ border: '2px solid red' })
            setLastNameErrorMsg("The last name cannot be empty")
            isOrderInputVaild = false
        } else {
            setLastNameStyle({ border: '2px solid green' })
            setLastNameErrorMsg("")
            isOrderInputVaild = true
        }
    }

    const isPhoneValid = () => {
        if (phone.length !== 8) {
            setPhoneStyle({ border: '2px solid red' })
            setPhoneErrorMsg("The phone number is not valid")
            isOrderInputVaild = false
        } else {
            setPhoneStyle({ border: '2px solid green' })
            setPhoneErrorMsg("")
            isOrderInputVaild = true
        }
    }

    const isAddressValid = () => {
        if (deliveryAdress === "" || deliveryAdress === null) {
            setAddressStyle({ border: '2px solid red' })
            setAddressErrorMsg("The address cannot be empty")
            isOrderInputVaild = false
        } else {
            setAddressStyle({ border: '2px solid green' })
            setAddressErrorMsg("")
            isOrderInputVaild = true
        }
    }

    // Session 3

    const [creditCard, setCreditCard] = useState(false)
    const [cash, setCash] = useState(false)
    const [weChatPay, setWechatPay] = useState(false)
    const [alipay, setAlipay] = useState(false)

    const paymentMethod = (a, b, c, d) => {
        setCreditCard(a)
        setCash(b)
        setWechatPay(c)
        setAlipay(d)
    }

    const [paymentOption, setPaymentOption] = useState("")

    const [nameOnCard, setNameOnCard] = useState("")
    const [cardNum, setCardNum] = useState("")
    const [expTime, setExpTime] = useState("")
    const [CVV, setCVV] = useState("")

    const [nameOnCardStyle, setNameOnCardStyle] = useState({})
    const [cardNumStyle, setCardNumStyle] = useState({})
    const [CVVStyle, setCVVStyle] = useState({})

    const [nameOnCardErrMsg, setNameOnCardErrMsg] = useState("")
    const [cardNumErrMsg, setCardNumErrMsg] = useState("")
    const [CVVErrMsg, setCVVErrMsg] = useState("")

    let isCreditCardValid = true

    const isNameOnCardValid = () => {
        if (nameOnCard === "" || nameOnCard === null) {
            setNameOnCardStyle({ border: '2px solid red' })
            setNameOnCardErrMsg("Card holder name cannot be empty")
            isCreditCardValid = false
        } else {
            setNameOnCardStyle({ border: '2px solid green' })
            setNameOnCardErrMsg("")
            isCreditCardValid = true
        }
    }

    const isCardNumValid = () => {
        if (cardNum.length !== 16) {
            setCardNumStyle({ border: '2px solid red' })
            setCardNumErrMsg("Card number isn't valid")
            isCreditCardValid = false
        } else {
            setCardNumStyle({ border: '2px solid green' })
            setCardNumErrMsg("")
            isCreditCardValid = true
        }
    }

    const isCVVValid = () => {
        if (CVV.length !== 3) {
            setCVVStyle({ border: '2px solid red' })
            setCVVErrMsg("CVV is not valid")
            isCreditCardValid = false
        } else {
            setCVVStyle({ border: '2px solid green' })
            setCVVErrMsg("")
            isCreditCardValid = true
        }
    }

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    };

    // Confirm Message

    const [confirmMsgShow, setConfirmMsgShow] = useState(false)

    const enableConfirmMsg = () => {
        setConfirmMsgShow(true)
    }

    const disableConfirmMsg = () => {
        setConfirmMsgShow(false)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const maxPage = Math.ceil(cartItems.length / itemsPerPage);
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === Math.ceil(cartItems.length / itemsPerPage);
    const showPagination = cartItems.length > itemsPerPage;

    // Save to json server 

    const [orderTotalAmount, setOrderTotalAmount] = useState(0)

    useEffect(() => {
        if (totalPrice >= freeShippingPrice || !inputEnable) {
            setOrderTotalAmount(totalPrice + platformFee - orderDiscount);
        } else {
            setOrderTotalAmount(totalPrice + platformFee + deliveryFee * restaurantNum - orderDiscount);
        }
    }, [totalPrice, inputEnable, paymentOption])

    const saveOrder = (e) => {
        e.preventDefault()

        const fullName = firstName + " " + lastName
        const fullAddress = deliveryAdress + ", " + districtSelect + ", " + regionSelect
        const current = new Date()
        const status = 'Preparing'
        const deliveryPerson = ''

        let currentDate = current.toLocaleTimeString()
        let currentTime = current.toLocaleDateString()

        let orderObj = {
            userID,
            status,
            deliveryPerson,
            orderInfo: {
                currentDate,
                currentTime,
                orderTotalAmount,
                restaurantNum,
                paymentOption,
                deliveryOption,
                estimateDeliveryTime,
                fullAddress,
                userEmail,
                fullName,
                phone
            },
            orderMeal: cartItems
        }

        if (isOrderInputVaild === true && isCreditCardValid === true) {

            fetch("http://" + window.location.host.split(":")[0] + ":8000/order", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(orderObj)
            }).then(() => {
                toast.success('Ordered successfully')
                setConfirmMsgShow(false)
                clearCart()
                goSpecifyPage('/OrderHistory')
            }).catch((err) => {
                toast.error('Failed :' + err.message)
            })

        } else
            toast.error("Fail to create order")

    }

    return (
        <>
            <NavBarCustomer />
            <ShoppingNavBar title="Checkout" destination="/ShoppingCart" situation="Go Back To Shopping Cart" />

            <div className='checkout-container'>
                <div className='checkout-session'>
                    <div className='checkout-area'>
                        <h3>1. REVIEW YOUR ORDER</h3>
                        {
                            uniqueRestaurantsArray.map((food, index) => {
                                restaurantNum++;
                                return (
                                    <div key={index} style={{ marginBottom: '8px' }}>
                                        <p><strong>Ordered Restaurant {restaurantNum} :</strong> {food.restaurant}</p>
                                        <p><i className="fa-solid fa-location-dot"></i> {food.address}</p>
                                    </div>
                                );
                            })
                        }
                        <p style={{color: 'red', marginBottom: '6px'}}><small>*Please take a screenshot to save the address in case of self-pickup</small></p>
                        <hr />
                        <div className='review-group'>
                            <table>
                                <tbody>
                                    {
                                        cartItems.map(food => (
                                            <tr key={food.id} className='shoppingCart-element'>
                                                <td>
                                                    <img src={process.env.PUBLIC_URL + '/img/' + food.img} style={{ width: '140px' }} />
                                                </td>
                                                <td>
                                                    <h5>{food.foodName}</h5>
                                                    <p><small>{food.restaurant}</small></p>
                                                    <p><small>${food.price}</small></p>
                                                </td>
                                                <td>
                                                    Qty: {food.quantity}
                                                </td>
                                                <td className='foodSubTotal'>
                                                    ${food.price * food.quantity}
                                                </td>

                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <hr style={{ marginBottom: '10px' }} />
                            <div className='review-group-cost'>
                                <div className='review-group-cost-element'>
                                    <h4>Subtotal</h4>
                                    <p>${totalPrice}</p>
                                </div>

                                <div className='review-group-cost-element'>
                                    <h4>Delivery Fee</h4>
                                    {
                                        totalPrice >= freeShippingPrice || !inputEnable ?
                                            <p>$0</p> :
                                            <p>${deliveryFee * restaurantNum} <small>(for {restaurantNum} restaurant)</small></p>
                                    }
                                </div>

                                <div className='review-group-cost-element'>
                                    <h4>Platform Fee</h4>
                                    <p>${platformFee}</p>
                                </div>

                                <div className='review-group-cost-element'>
                                    <h4>Other Discount</h4>
                                    <p>${orderDiscount}</p>
                                </div>

                                <hr style={{ marginBottom: '10px' }} />

                                <div className='review-group-cost-element'>
                                    <h3>Total Price</h3>
                                    {
                                        totalPrice >= freeShippingPrice || !inputEnable ?
                                            <p><strong>${totalPrice + platformFee - orderDiscount}</strong></p> :
                                            <p><strong>${totalPrice + platformFee + deliveryFee * restaurantNum - orderDiscount}</strong></p>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='checkout-session'>
                    <div className='checkout-area'>
                        <h3>2. SELECT PICK UP METHOD</h3>
                        <div className="radio-group">
                            <div className="radio-list">
                                <div className="radio-item">
                                    <input
                                        name="radio"
                                        id="radio1"
                                        type="radio"
                                        value="delivery"
                                        checked={deliveryOption === 'delivery'}
                                        onClick={() => setInputEnable(true)}
                                        onChange={(e) => setDeliveryoption(e.target.value)} />
                                    <label htmlFor="radio1">Delivery <small>{deliveryOption === 'delivery' ? `(Estimate time : ${estimateDeliveryTime}mins)` : ''}</small></label>
                                </div>
                                <div className="radio-item">
                                    <input
                                        name="radio"
                                        id="radio2"
                                        type="radio"
                                        value="self pick-up"
                                        checked={deliveryOption === 'self pick-up'}
                                        onClick={() => setInputEnable(false)}
                                        onChange={(e) => setDeliveryoption(e.target.value)} />
                                    <label htmlFor="radio2">Self pick-up</label>
                                </div>
                                {
                                    !inputEnable && restaurantNum >= 2 ?
                                        <p style={{ color: 'red', marginTop: '10px' }}><small>It is recommended to choose delivery for convenience*</small></p> :
                                        <p></p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='checkout-area'>
                        <div className='deliveryInfo-group'>
                            <h3>3. DELIVERY INFO</h3>
                            {
                                !inputEnable ?
                                    <p style={{ color: 'red' }}><small>All field is not required*</small></p> :
                                    <p style={{ color: 'red' }}><small>All field required*</small></p>
                            }
                            <div className='input-group' style={{ margin: '20px 0' }}>
                                <input
                                    type='email'
                                    value={userEmail}
                                    required />
                                <label style={labelStyle}>Email Adress<span>*</span></label>
                            </div>
                            <div className='input-group'>
                                <input
                                    type='text'
                                    style={firstNameStyle}
                                    disabled={!inputEnable}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    onKeyUp={isFirstNameValid}
                                    required />
                                {
                                    firstNameErrorMsg != '' &&
                                    <p className='input-errorMsg'>{firstNameErrorMsg}</p>
                                }
                                <label style={labelStyle}>First Name<span>*</span></label>
                            </div>
                            <div className='input-group'>
                                <input
                                    type='text'
                                    style={lastNameStyle}
                                    disabled={!inputEnable}
                                    value={lastName}
                                    onKeyUp={isLastNameValid}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required />
                                {
                                    lastNameErrorMsg != '' &&
                                    <p className='input-errorMsg'>{lastNameErrorMsg}</p>
                                }
                                <label style={labelStyle}>Last Name<span>*</span></label>
                            </div>
                            <div className='input-group'>
                                <input
                                    type='number'
                                    style={phoneStyle}
                                    disabled={!inputEnable}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    onKeyUp={isPhoneValid}
                                    required />
                                {
                                    phoneErrorMsg != '' &&
                                    <p className='input-errorMsg'>{phoneErrorMsg}</p>
                                }
                                <label style={labelStyle}>Phone<span>*</span></label>
                            </div>
                            <div className='muti-input-group'>
                                <div className='dropdown-list-group'>
                                    <div className='input-group'>
                                        <input
                                            type='text'
                                            value={regionSelect}
                                            required />
                                        <button
                                            id='dropdown-btn1'
                                            className='dropdown-btn'
                                            onClick={showRegion}><i className="fa-solid fa-caret-down"></i></button>
                                        <label style={labelStyle}>Region<span>*</span></label>
                                    </div>
                                    <div className='input-option' id='input-option1'>
                                        {
                                            region.map((data, index) => (
                                                <div key={index} onClick={() => setRegionSelect(data)}>
                                                    <p onClick={closeRegion}>{data}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='dropdown-list-group'>
                                    <div className='input-group'>
                                        <input
                                            type='text'
                                            value={districtSelect}
                                            required />
                                        <button
                                            id='dropdown-btn2'
                                            className='dropdown-btn'
                                            onClick={showDistrict}><i class="fa-solid fa-caret-down"></i></button>
                                        <label style={labelStyle}>District<span>*</span></label>
                                    </div>
                                    <div className='input-option' id='input-option2'>
                                        {
                                            district.map((data, index) => (
                                                <div key={index} onClick={() => setDistrictSelect(data)}>
                                                    <p onClick={closeDistrict}>{data}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='input-group'>
                                <textarea
                                    style={addressStyle}
                                    disabled={!inputEnable}
                                    value={deliveryAdress}
                                    onChange={(e) => setDeliveryAdress(e.target.value)}
                                    onKeyUp={isAddressValid}
                                    required></textarea>
                                {
                                    addressErrorMsg != '' &&
                                    <p className='input-errorMsg'>{addressErrorMsg}</p>
                                }
                                <label style={labelStyle}>Delivery Address<span>*</span></label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='checkout-session'>
                    <div className='checkout-area'>
                        <h3>4. SELECT PAYMENT METHOD</h3>
                        <div className='paymentMethod-group'>
                            <div>
                                <button
                                    onClick={() => {
                                        paymentMethod(true, false, false, false)
                                        setPaymentOption("Credit Card")
                                    }}>Credit Card<i className="fa-solid fa-credit-card"></i></button>
                                <button
                                    onClick={() => {
                                        paymentMethod(false, true, false, false)
                                        setPaymentOption("Cash")
                                    }}>Cash<i className="fa-brands fa-paypal"></i></button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        paymentMethod(false, false, true, false)
                                        setPaymentOption("WeChat Pay HK")
                                    }}>WeChat Pay HK<i className="fa-brands fa-weixin"></i></button>
                                <button
                                    onClick={() => {
                                        paymentMethod(false, false, false, true)
                                        setPaymentOption("Alipay HK")
                                    }}>Alipay HK<i className="fa-brands fa-alipay"></i></button>
                            </div>
                        </div>
                    </div>

                    <div className='checkout-area'>
                        <h3>5. PAYMENT INFO</h3>
                        <div>
                            {
                                (creditCard || cash || weChatPay || alipay) ||
                                <p style={{ fontSize: '20px' }}>Please select the payment method first !</p>
                            }
                            {
                                creditCard &&
                                <div>
                                    <p style={{ marginBottom: '10px' }}>Accepted Cards :</p>
                                    <img src={process.env.PUBLIC_URL + '/img/checkout_payment3.png'}></img>
                                    <p style={{ color: 'red' }}><small>All field required*</small></p>
                                    <div className='input-group' style={{ marginTop: '16px' }}>
                                        <input
                                            type='text'
                                            style={nameOnCardStyle}
                                            value={nameOnCard}
                                            onKeyUp={isNameOnCardValid}
                                            onChange={e => setNameOnCard(e.target.value)}
                                            required />
                                        {
                                            nameOnCardErrMsg &&
                                            <p className='input-errorMsg'>{nameOnCardErrMsg}</p>
                                        }
                                        <label style={labelStyle}>Name On Card<span>*</span></label>
                                    </div>
                                    <div className='input-group'>
                                        <input
                                            type='number'
                                            style={cardNumStyle}
                                            value={cardNum}
                                            onKeyUp={isCardNumValid}
                                            onChange={e => setCardNum(e.target.value)}
                                            required />
                                        {
                                            cardNumErrMsg &&
                                            <p className='input-errorMsg'>{cardNumErrMsg}</p>
                                        }
                                        <label style={labelStyle}>Card Number<span>*</span></label>
                                    </div>
                                    <div className='muti-input-group'>
                                        <div className='input-group'>
                                            <input
                                                type='month'
                                                value={expTime}
                                                min={getCurrentDate()}
                                                onChange={e => setExpTime(e.target.value)}
                                                required
                                            />
                                            <label style={labelStyle}>Exp Month and Year<span>*</span></label>
                                        </div>
                                        <div className='input-group'>
                                            <input
                                                type='number'
                                                style={CVVStyle}
                                                value={CVV}
                                                onKeyUp={isCVVValid}
                                                onChange={e => setCVV(e.target.value)}
                                                required />
                                            {
                                                CVVErrMsg &&
                                                <p className='input-errorMsg'>{CVVErrMsg}</p>
                                            }
                                            <label style={labelStyle}>CVV<span>*</span></label>
                                        </div>
                                    </div>
                                    <br />
                                    <div className='showConfirmBtn-area'>
                                        <button
                                            className='showConfirmBtn'
                                            onClick={() => enableConfirmMsg()}>Checkout</button>
                                    </div>
                                </div>
                            }

                            {
                                cash &&
                                <div>
                                    <h3>Friendly Reminder <i className="fa-solid fa-face-laugh-wink"></i></h3>
                                    <p style={{ lineHeight: '1.5' }}>Upon the arrival of the delivery presonnal at the designated location,
                                        it is required to remit payment to the delivery personnal. Thank you!
                                    </p>
                                    <br />
                                    <div className='showConfirmBtn-area'>
                                        <button
                                            className='showConfirmBtn'
                                            onClick={() => enableConfirmMsg()}>Checkout</button>
                                    </div>
                                </div>
                            }

                            {
                                weChatPay &&
                                <div>
                                    <h3>Friendly Reminder <i className="fa-solid fa-face-laugh-wink"></i></h3>
                                    <p style={{ marginBottom: '12px' }}>Please open the WeChat Pay HK and scan the QR code</p>
                                    <img src={process.env.PUBLIC_URL + '/img/checkout_payment2.png'} className='codePayment'></img>
                                    <br />
                                    <div className='showConfirmBtn-area'>
                                        <button
                                            className='showConfirmBtn'
                                            onClick={() => enableConfirmMsg()}>Checkout</button>
                                    </div>
                                </div>
                            }

                            {
                                alipay &&
                                <div>
                                    <h3>Friendly Reminder <i className="fa-solid fa-face-laugh-wink"></i></h3>
                                    <p style={{ marginBottom: '12px' }}>Please open the AliPay HK and scan the QR code</p>
                                    <img src={process.env.PUBLIC_URL + '/img/checkout_payment1.png'} className='codePayment'></img>
                                    <br />
                                    <div className='showConfirmBtn-area'>
                                        <button
                                            className='showConfirmBtn'
                                            onClick={() => enableConfirmMsg()}>Checkout</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {
                confirmMsgShow &&
                <div className='confirmMsg-container'>
                    <div className='confirmMsg-heading'>
                        <h2>Confirm Message</h2>
                        <button onClick={() => disableConfirmMsg()}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>
                    <hr style={{ margin: '15px 0' }} />
                    <div className='confirmMsg-mainContent'>
                        <div className='mainContent-orderMeal'>
                            <h3 style={{ textDecoration: 'underline' }}>Ordered Meal</h3>
                            <table>
                                <tbody>
                                    {
                                        currentItems.map((food, index) => (
                                            <tr key={food.id}>
                                                <td className='firstTd'>
                                                    <p>{food.foodName}</p>
                                                    <p><small>{food.restaurant}</small></p>
                                                    <p><small>${food.price}</small></p>
                                                </td>
                                                <td className='secondTd'>
                                                    <p>QTY: {food.quantity}</p>
                                                </td>
                                                <td className='thirdTd'>
                                                    <p>${food.price * food.quantity}</p>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                showPagination && (
                                    <div>
                                        {
                                            !isFirstPage && (
                                                <button
                                                    onClick={handlePreviousPage}
                                                    className='pageBtn'>Previous</button>
                                            )
                                        }
                                        {
                                            !isLastPage && (
                                                <button
                                                    onClick={handleNextPage}
                                                    className='pageBtn'>Next</button>
                                            )
                                        }
                                    </div>
                                )
                            }
                            <hr />
                            <div className='orderMeal-cost'>
                                <div className='orderMeal-cost-element'>
                                    <h4>Subtotal</h4>
                                    <p>${totalPrice}</p>
                                </div>

                                <div className='orderMeal-cost-element'>
                                    <h4>Delivery Fee</h4>
                                    {
                                        totalPrice >= freeShippingPrice || !inputEnable ?
                                            <p>$0</p> :
                                            <p>${deliveryFee * restaurantNum}</p>
                                    }
                                </div>

                                <div className='orderMeal-cost-element'>
                                    <h4>Platform Fee</h4>
                                    <p>${platformFee}</p>
                                </div>

                                <div className='orderMeal-cost-element'>
                                    <h4>Other Discount</h4>
                                    <p>${orderDiscount}</p>
                                </div>

                                <hr style={{ marginBottom: '10px' }} />

                                <div className='orderMeal-cost-element'>
                                    <h4>Total Price</h4>
                                    {
                                        totalPrice >= freeShippingPrice || !inputEnable ?
                                            <p><strong>${orderTotalAmount}</strong></p> :
                                            <p><strong>${orderTotalAmount}</strong></p>
                                    }

                                </div>
                            </div>
                        </div>

                        <div className='mainContent-orderInfo'>
                            <h3 style={{ textDecoration: 'underline' }}>Order Info</h3>
                            <div className='orderInfo-detail'>
                                <div className='orderInfo-detail-element'>
                                    <h4>Payment Method</h4>
                                    <p>{paymentOption}</p>
                                </div>
                                <hr />
                                {
                                    deliveryOption === 'delivery' ?
                                        <div>
                                            <div className='orderInfo-detail-element'>
                                                <h4>Pick-up Method</h4>
                                                <p>{deliveryOption}</p>
                                            </div>

                                            <div className='orderInfo-detail-element'>
                                                <h4>Estimate Delivery Time</h4>
                                                <p>{estimateDeliveryTime}mins</p>
                                            </div>

                                            <div className='orderInfo-detail-element'>
                                                <h4>Email Address</h4>
                                                <p>{userEmail}</p>
                                            </div>

                                            <div className='orderInfo-detail-element'>
                                                <h4>Full Name</h4>
                                                <p>{firstName + " " + lastName}</p>
                                            </div>

                                            <div className='orderInfo-detail-element'>
                                                <h4>Phone</h4>
                                                <p>{phone}</p>
                                            </div>

                                            <div className='orderInfo-detail-element'>
                                                <h4>Delivery Address</h4>
                                                <p style={{ width: '80%', textAlign: 'right' }}>{deliveryAdress + ", " + districtSelect + ", " + regionSelect}</p>
                                            </div>
                                        </div>
                                        :
                                        <div className='orderInfo-detail-element'>
                                            <h4>Pick-up Method</h4>
                                            <p>{deliveryOption}</p>
                                        </div>
                                }
                            </div>
                            <hr />
                            <div className='mainContent-confirmOrder'>
                                <button
                                    className='confirmOrderBtn'
                                    onClick={(e) => saveOrder(e)}>Confirm To Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}
