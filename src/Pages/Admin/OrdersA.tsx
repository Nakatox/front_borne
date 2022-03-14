import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../Components/Admin/Header'
import OrderA from '../../Components/Admin/OrderA'
import { Order } from '../../Interface/Order'
import { OrderContext } from '../../Provider/OrderProvider'
import { GetOrders } from '../../Services/OrderAPI'

const OrdersA = () => {

    let {orders, setOrders} = useContext(OrderContext)
    
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