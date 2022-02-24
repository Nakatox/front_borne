import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { GetOrders } from '../Services/OrderAPI'


export const OrderContext = createContext()


const OrderProvider = (props: any): JSX.Element => {


    const [orders, setOrders] = useState([])

    const getOrders = async() => {
        const response = await GetOrders()
        setOrders(response)
    }

    useEffect(()=>{
        getOrders()
    }, [])


    return (
        <OrderContext.Provider value={{orders, setOrders}}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderProvider