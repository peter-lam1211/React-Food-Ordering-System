import React from 'react'

export default function DeliveryProgress({orderDetail}) {
    return (
        <div>
            {
                orderDetail.length > 0 && orderDetail.map(order => {
                    if (orderDetail[0].orderInfo.deliveryOption === 'delivery') {
                        if (order.status === 'Preparing') {
                            return (
                                <div className="step-wizard">
                                    <ul className="step-wizard-list">
                                        <li className="step-wizard-item current-item">
                                            <span className="progress-count">1</span>
                                            <span className="progress-label" style={{color: '#9cb028'}}>Preparing <i className="fa-solid fa-kitchen-set"></i></span>
                                        </li>
                                        <li className="step-wizard-item">
                                            <span className="progress-count">2</span>
                                            <span className="progress-label" style={{color: '#3f76d3'}}>Pickup <i className="fa-solid fa-truck"></i></span>
                                        </li>
                                        <li className="step-wizard-item">
                                            <span className="progress-count">3</span>
                                            <span className="progress-label" style={{color: '#e5a72b'}}>Deliverying <i className="fa-solid fa-person-running"></i></span>
                                        </li>
                                        <li className="step-wizard-item">
                                            <span className="progress-count">4</span>
                                            <span className="progress-label" style={{color: '#2ac177'}}>Arrive <i className="fa-solid fa-face-laugh-squint"></i></span>
                                        </li>
                                    </ul>
                                </div>
                            );
                        } else if (order.status === 'Pickup') {
                            return (
                                <div className="step-wizard">
                                    <ul className="step-wizard-list">
                                        <li className="step-wizard-item">
                                            <span className="progress-count">1</span>
                                            <span className="progress-label" style={{color: '#9cb028'}}>Preparing <i className="fa-solid fa-kitchen-set"></i></span>
                                        </li>
                                        <li className="step-wizard-item current-item">
                                            <span className="progress-count">2</span>
                                            <span className="progress-label" style={{color: '#3f76d3'}}>Pickup <i className="fa-solid fa-truck"></i></span>
                                        </li>
                                        <li className="step-wizard-item">
                                            <span className="progress-count">3</span>
                                            <span className="progress-label" style={{color: '#e5a72b'}}>Deliverying <i className="fa-solid fa-person-running"></i></span>
                                        </li>
                                        <li className="step-wizard-item">
                                            <span className="progress-count">4</span>
                                            <span className="progress-label" style={{color: '#2ac177'}}>Arrive <i className="fa-solid fa-face-laugh-squint"></i></span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        } else if (order.status === 'Deliverying') {
                            return (
                                <div className="step-wizard">
                                    <ul className="step-wizard-list">
                                        <li className="step-wizard-item">
                                            <span className="progress-count">1</span>
                                            <span className="progress-label" style={{color: '#9cb028'}}>Preparing <i className="fa-solid fa-kitchen-set"></i></span>
                                        </li>
                                        <li className="step-wizard-item">
                                            <span className="progress-count">2</span>
                                            <span className="progress-label" style={{color: '#3f76d3'}}>Pickup <i className="fa-solid fa-truck"></i></span>
                                        </li>
                                        <li className="step-wizard-item current-item">
                                            <span className="progress-count">3</span>
                                            <span className="progress-label" style={{color: '#e5a72b'}}>Deliverying <i className="fa-solid fa-person-running"></i></span>
                                        </li>
                                        <li className="step-wizard-item">
                                            <span className="progress-count">4</span>
                                            <span className="progress-label" style={{color: '#2ac177'}}>Arrive <i className="fa-solid fa-face-laugh-squint"></i></span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        } else if (order.status === 'Arrive') {
                            return (
                                <div className="step-wizard">
                                    <ul className="step-wizard-list">
                                        <li className="step-wizard-item">
                                            <span className="progress-count">1</span>
                                            <span className="progress-label" style={{color: '#9cb028'}}>Preparing <i className="fa-solid fa-kitchen-set"></i></span>
                                        </li>
                                        <li className="step-wizard-item">
                                            <span className="progress-count">2</span>
                                            <span className="progress-label" style={{color: '#3f76d3'}}>Pickup <i className="fa-solid fa-truck"></i></span>
                                        </li>
                                        <li className="step-wizard-item">
                                            <span className="progress-count">3</span>
                                            <span className="progress-label" style={{color: '#e5a72b'}}>Deliverying <i className="fa-solid fa-person-running"></i></span>
                                        </li>
                                        <li className="step-wizard-item current-item">
                                            <span className="progress-count">4</span>
                                            <span className="progress-label" style={{color: '#2ac177'}}>Arrive <i className="fa-solid fa-face-laugh-squint"></i></span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    } else {
                        if (order.status === 'Preparing') {
                            return (
                                <div className="step-wizard">
                                    <ul className="step-wizard-list">
                                        <li className="step-wizard-item current-item">
                                            <span className="progress-count">1</span>
                                            <span className="progress-label" style={{color: '#9cb028'}}>Preparing <i className="fa-solid fa-kitchen-set"></i></span>
                                        </li>
                                        <li className="step-wizard-item">
                                            <span className="progress-count">2</span>
                                            <span className="progress-label" style={{color: '#dda0dd'}}>Ready <i className="fa-solid fa-face-laugh-squint"></i></span>
                                        </li>
                                    </ul> 
                                </div>
                            )
                        } else if (order.status === 'Ready') {
                            return (
                                <div className="step-wizard">
                                    <ul className="step-wizard-list">
                                        <li className="step-wizard-item">
                                            <span className="progress-count">1</span>
                                            <span className="progress-label" style={{color: '#9cb028'}}>Preparing <i className="fa-solid fa-kitchen-set"></i></span>
                                        </li>
                                        <li className="step-wizard-item current-item">
                                            <span className="progress-count">2</span>
                                            <span className="progress-label" style={{color: '#dda0dd'}}>Ready <i className="fa-solid fa-face-laugh-squint"></i></span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    }
                })
            }
        </div>
    )
}
