import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../Components/Admin/Header'
import OrderA from '../../Components/Admin/OrderA'
import { Order } from '../../Interface/Order'
import { GetOrders } from '../../Services/OrderAPI'

const OrdersA = () => {

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const response = await GetOrders()
        setOrders(response)
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div>
            <Header/>

            <div style={{display:"flex", flexWrap:"wrap"}}>
                {orders.map((order: Order) => {
                    return (
                        <OrderA key={order.id} order={order} />
                    )
                })}
            </div>
            
            
        </div>
    )
}

export default OrdersA