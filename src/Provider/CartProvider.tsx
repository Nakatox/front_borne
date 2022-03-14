import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'


export const CartContext = createContext()

const CartProvider = (props: any): JSX.Element => {

    const defaultCart = {
        products: [],
        totPrice: 0
    }

    const [cart, setCart] = useState(defaultCart)


    useEffect(() => {

    }, [cart])

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider