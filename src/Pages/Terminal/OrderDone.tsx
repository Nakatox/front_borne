import React from 'react'
import { useParams } from 'react-router-dom'

const OrderDone = (): JSX.Element => {

    const {orderNumber} = useParams()

    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
            <h1>Order n°{orderNumber}</h1>
        </div>
    )
}

export default OrderDone