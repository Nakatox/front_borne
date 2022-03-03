import React from 'react'
import { useParams } from 'react-router-dom'

const OrderDone = (): JSX.Element => {

    const {orderNumber} = useParams()

    return (
        <div>Command n° {orderNumber}</div>
    )
}

export default OrderDone