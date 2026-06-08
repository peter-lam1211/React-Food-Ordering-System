import React from 'react'
import '../css/RestaurantPage/LoadingEffect.css'

export default function LoadingEffect() {
    return (
        <div className="loading-container">
            <div className="loader">
                <div className="loader--dot"></div>
                <div className="loader--dot"></div>
                <div className="loader--dot"></div>
                <div className="loader--dot"></div>
                <div className="loader--dot"></div>
                <div className="loader--dot"></div>
                <div className="loader--text"></div>
            </div>
        </div>
    )
}
