import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Order } from '../../Interface/Order'
import { OrderContext } from '../../Provider/OrderProvider'
import OrderDetail from './OrderDetail'




const OrderK = () => {
    
    let {orders, setOrders} = useContext(OrderContext)

    let [orderNotDone, setOrderNotDone] = useState([])

    const setOrder = (order: Order) => {
       setOrderNotDone(orders.filter((o: Order) => o.state.name !== "done"))
    }

    const onChange = (order: Order) => {
        setOrderNotDone(orderNotDone.filter((o: Order) => o.id !== order.id))
    }

    useEffect(() => {
        setOrder(orders)
    }, [orders])
    
    
    if (orderNotDone.length !== 0) {
        return (
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {orderNotDone.map((data:Order, index:number) => {                    
                    return <OrderDetail key={index} id= {index} order={data} onChange={onChange}></OrderDetail>
                })}
            </div>
        )
    } else {
        return (
            <div>
                <p>Loading</p> 
            </div>
        )
    }
}
    
export default OrderK