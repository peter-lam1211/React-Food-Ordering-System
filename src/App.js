import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import LoginRegister from "./LoginRegister/LoginRegister"
import IndexCustomer from "./CustomerPage/IndexCustomer"
import TermAndCondition from './LoginRegister/TermAndCondition'
import IndexRestaurant from './RestaurantPage/IndexRestaurant'
import IndexDelivery from './DeliveryPage/IndexDelivery'
import FoodList from './CustomerPage/FoodList'
import ShoppingCart from './CustomerPage/ShoppingCart'
import OrderHistory from './CustomerPage/OrderHistory'
import FoodDetail from './CustomerPage/FoodDetail'
import Checkout from './CustomerPage/Checkout'
import { CartContext } from './CustomerPage/CartContext'
import { useState } from 'react'
import MenuItem from './RestaurantPage/MenuItem'
import OrderManage from './RestaurantPage/OrderManage'
import PickupOrderHistory from './DeliveryPage/PickupOrderHistory'

function App() {

    const notFoundStyle = {
        
    }

    const [cartItems, setCartItems] = useState([])

    return (
        <div>
            <ToastContainer theme='colored'></ToastContainer>

            <CartContext.Provider value={{cartItems, setCartItems}}>

                <BrowserRouter>
                    <Routes>
                        {/* login / register */}
                        <Route path='/' element={<LoginRegister />} />
                        <Route path='/TermAndCondition' element={<TermAndCondition />} />
                        {/* Customer session */}
                        <Route path='/IndexCustomer' element={<IndexCustomer />} />
                        <Route path='/FoodList' element={<FoodList />} />
                        <Route path='/FoodDetail' element={<FoodDetail/>}>
                            <Route path=':id' element={<FoodDetail/>} />
                        </Route>
                        <Route path='/OrderHistory' element={<OrderHistory />} />
                        <Route path='/ShoppingCart' element={<ShoppingCart />} />
                        <Route path='/Checkout' element={<Checkout />} />
                        {/* Restaurant session */}
                        <Route path='/IndexRestaurant' element={<IndexRestaurant />} />
                        <Route path='/MenuItem' element={<MenuItem />} />
                        <Route path='/OrderManage' element={<OrderManage/>} />
                        {/* Delivery session */}
                        <Route path='/IndexDelivery' element={<IndexDelivery />} />
                        <Route path='/PickupOrderHistory' element={<PickupOrderHistory/>} />
                        
                        <Route path="*" element={<p className='not-found' style={notFoundStyle}>404 Not Found</p>}></Route>
                    </Routes>
                </BrowserRouter>

            </CartContext.Provider>
            
        </div>
    )
}

export default App;
