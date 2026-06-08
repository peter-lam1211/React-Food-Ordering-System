import React from 'react'

export default function footerSession({position, bottom}) {

    const footerStyle = {
        position: position,
        bottom: bottom,
        left: '0',
        right: '0',
        background: '#111',
        height: 'auto',
        paddingTop: '40px',
        color: 'white'
    }

    const topStyle = {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
    }

    const top_h3Style = {
        fontSize: '1.8rem',
        fontWeight: '400',
        textTransform: 'capitalize',
        lineHeight: '3rem'
    }

    const top_pStyle = {
        maxWidth: '500px',
        margin: '10px auto',
        lineHeight: '28px',
        fontSize: '14px'
    }

    const top_ulStyle = {
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1rem 0 3rem 0'
    }

    const top_liStyle = {
        margin: '0 10px'
    }

    const top_iStyle = {
        fontSize: '1.1rem'
    }

    const bottomStyle = {
        background: '#000',
        padding: '20px 0',
        textAlign: 'center'
    }

    const bottom_pStyle = {
        fontSize: '14px',
        wordSpacing: '2px',
        textTransform: 'capitalize'
    }

    return (
        <footer style={footerStyle}>
            <div style={topStyle}>
                <h3 style={top_h3Style}>Yummy Food</h3>
                <p style={top_pStyle}>Contact us at info@yummy.com. Follow us on social media for delicious updates and special offers</p>
                <ul style={top_ulStyle}>
                    <li style={top_liStyle}><i className="fa-brands fa-facebook" style={top_iStyle}></i></li>
                    <li style={top_liStyle}><i className="fa-brands fa-twitter" style={top_iStyle}></i></li>
                    <li style={top_liStyle}><i className="fa-brands fa-google" style={top_iStyle}></i></li>
                    <li style={top_liStyle}><i className="fa-brands fa-youtube" style={top_iStyle}></i></li>
                    <li style={top_liStyle}><i className="fa-brands fa-linkedin" style={top_iStyle}></i></li>
                </ul>
            </div>
            <div style={bottomStyle}>
                <p style={bottom_pStyle}>© 2025 Yummy Limited. All rights reserved.</p>
            </div>
        </footer>
    )
}
