import React from 'react'
import { useContext } from 'react'
import { Order } from '../../Interface/Order'
import { OrderContext } from '../../Provider/OrderProvider'
import OrderDetail from './OrderDetail'




const OrderK = () => {
    
    let {orders, setOrders} = useContext(OrderContext)
    
    
    if (orders !== undefined) {
        return (
            <div>
                {orders.map((data:Order, index:number) => {                    
                    return <OrderDetail id= {index} order={data}></OrderDetail>
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