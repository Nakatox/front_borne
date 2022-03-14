import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { GetOrders } from '../Services/OrderAPI'
import { io } from 'socket.io-client'
import { Order } from '../Interface/Order'


export const OrderContext = createContext()


const OrderProvider = (props: any): JSX.Element => {


    const [isLoaded, setisLoaded] = useState(false)
    let [orders, setOrders] = useState([])

    const getOrders = async() => {
        const response = await GetOrders()
        setOrders(response)     
        setisLoaded(true)   
    }
        
    useEffect(()=>{
        getOrders()
    }, [])

    useEffect(() => {
        if (isLoaded){
            const socket = io("http://localhost:8000"); 
            socket.off('newOrder').on("newOrder", (data) => {
                setOrders(orders = [...orders, data.order])
            });
        }
    }, [isLoaded])


    return (
        <OrderContext.Provider value={{orders, setOrders}}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderProvider