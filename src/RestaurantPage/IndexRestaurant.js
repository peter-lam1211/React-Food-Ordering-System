import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Chart from 'chart.js/auto';
import Footer from '../Footer'
import NavBarRestaurant from './NavBarRestaurant'
import '../css/RestaurantPage/IndexRestaurant.css'

export default function IndexRestaurant() {

    const goLoginPage = useNavigate();

    let userEmail = sessionStorage.getItem('userEmail')
    let username = sessionStorage.getItem('username')

    useEffect(() => {
        if (userEmail === "" || userEmail === null) {
            goLoginPage("/")
        }
    }, [])

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
    }, [])

    const chart1 = useRef(null)
    const chart2 = useRef(null)

    useEffect(() => {
        const ctx1 = chart1.current.getContext('2d')
        let lineChart = null;

        if (ctx1 && ctx1.chart) {
            ctx1.chart.destroy();
        }

        lineChart = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Earning in $',
                    data: [5030, 3000, 4000, 8000, 6800, 7530, 6310, 3253, 2300, 5020, 9000, 8888],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2,
                    hoverOffset: 20
                }]
            },
            options: {
                responsive: true
            }
        });
        ctx1.chart = lineChart
    }, []);

    useEffect(() => {
        const ctx2 = chart2.current.getContext('2d')
        let doughnutChart = null;

        if (ctx2 && ctx2.chart) {
            ctx2.chart.destroy()
        }

        doughnutChart = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Fish and chip', 'Grilled pork chop', 'BBQ Ribs'],
                datasets: [{
                    label: 'Selling in set',
                    data: [10, 40, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 5
                }]
            }
        })
        ctx2.chart = doughnutChart
    }, [])

    const [recentOrder, setRecentOrder] = useState([])

    useEffect(() => {
        fetch(`http://${window.location.host.split(":")[0]}:8000/order`)
            .then(response => response.json())
            .then(jsonData => {
                const matchedOrders = jsonData.filter(item => {
                    return item.orderMeal.some(order => order.restaurant === username);
                });
                setRecentOrder(matchedOrders);
            });
    }, []);

    return (
        <div>
            <NavBarRestaurant />
            <div className='rest-dashboard'>
                <div className='rest-heading'>
                    <h2>Hello, wellcome back !</h2>
                    <div className='rest-heading-date-time'>
                        <h2>Time : {time.toLocaleTimeString()}</h2>
                        <h2>Date : {time.toLocaleDateString()}</h2>
                    </div>
                </div>

                <div className='rest-card-area'>
                    <div className='rest-card'>
                        <div className='rest-card-content'>
                            <div className='rest-card-number'>12</div>
                            <div className='rest-card-name'>Unprocessed order (today)</div>
                        </div>
                        <div className='rest-icon-box'>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    <div className='rest-card'>
                        <div className='rest-card-content'>
                            <div className='rest-card-number'>34</div>
                            <div className='rest-card-name'>Completed order (today)</div>
                        </div>
                        <div className='rest-icon-box'>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                    <div className='rest-card'>
                        <div className='rest-card-content'>
                            <div className='rest-card-number'>0</div>
                            <div className='rest-card-name'>Return order (today)</div>
                        </div>
                        <div className='rest-icon-box'>
                            <i className="fa-solid fa-circle-exclamation"></i>
                        </div>
                    </div>
                    <div className='rest-card'>
                        <div className='rest-card-content'>
                            <div className='rest-card-number'>$2145</div>
                            <div className='rest-card-name'>Sales total (today)</div>
                        </div>
                        <div className='rest-icon-box'>
                            <i className="fa-solid fa-money-check-dollar"></i>
                        </div>
                    </div>
                </div>

                <div className='rest-chart-area'>
                    <div className='rest-chart'>
                        <h2>Earnings (past 12 months)</h2>
                        <canvas ref={chart1}></canvas>
                    </div>
                    <div className='rest-chart' id='doughnut-chart'>
                        <h2>Top three selling items this mon</h2>
                        <canvas ref={chart2}></canvas>
                    </div>
                </div>

                <div className='rest-recent-data'>
                    <div className='rest-recent-order'>
                        <h2>Recent order</h2>

                        <div className='rest-recent-order-table'>
                            <div className='rest-recent-order-heading'>
                                <div className='rest-recent-order-cell'>
                                    <p>Order ID</p>
                                </div>
                                <div className='rest-recent-order-cell'>
                                    <p>Order Date</p>
                                </div>
                                <div className='rest-recent-order-cell'>
                                    <p>Order Time</p>
                                </div>
                                <div className='rest-recent-order-cell'>
                                    <p>Total Amount</p>
                                </div>
                            </div>
                            {
                                recentOrder.length > 0 && recentOrder.slice(-4).map((order) => (
                                    <div className='rest-recent-order-row' key={order.id}>
                                        <div className='rest-recent-order-cell'>
                                            <p>{order.id}</p>
                                        </div>
                                        <div className='rest-recent-order-cell'>
                                            <p>{order.orderInfo.currentDate}</p>
                                        </div>
                                        <div className='rest-recent-order-cell'>
                                            <p>{order.orderInfo.currentTime}</p>
                                        </div>
                                        <div className='rest-recent-order-cell'>
                                            <p>${order.orderInfo.orderTotalAmount}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='rest-recent-customer'>
                        <h2>Recent customer comment</h2>

                        <div className='rest-recent-customer-list'>
                            <div className='comment-card'>
                                <div className='comment' style={{ marginBottom: '8px' }}>
                                    <p>"Delicious food, great presentation. Will definitely come back for more!"</p>
                                    <p className='comment-small'>2 days ago</p>
                                </div>
                                <div className='comment-other'>
                                    <p><i className="fa-solid fa-circle-user"></i> Peter lam</p>
                                    <p className='comment-small'>Remove | Reply | Translate</p>
                                </div>
                            </div>
                            <div className='comment-card'>
                                <div className='comment' style={{ marginBottom: '8px' }}>
                                    <p>"Disappointing experience, slow service, and incorrect order. Food was mediocre."</p>
                                    <p className='comment-small'>2 days ago</p>
                                </div>
                                <div className='comment-other'>
                                    <p><i className="fa-solid fa-circle-user"></i> Quieen Tse</p>
                                    <p className='comment-small'>Remove | Reply | Translate</p>
                                </div>
                            </div>
                            <div className='comment-card'>
                                <div className='comment' style={{ marginBottom: '8px' }}>
                                    <p>"Cozy ambiance, diverse menu, helpful staff. Loved the flavors and dessert."</p>
                                    <p className='comment-small'>2 days ago</p>
                                </div>
                                <div className='comment-other'>
                                    <p><i className="fa-solid fa-circle-user"></i> Marry Lam</p>
                                    <p className='comment-small'>Remove | Reply | Translate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
