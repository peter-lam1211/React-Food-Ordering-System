import React, {useEffect, useState} from 'react'
import './css/Subheading.css'
import classNames from 'classnames';

export default function Subheading({ title }) {

    return (
        <div className='subHeading-container'>
            <h1>{title}</h1>
        </div>
    )
}
