import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'


export const CartContext = createContext()

const CartProvider = (props: any): JSX.Element => {

    const [cart, setCart] = useState([])

    return (
        <div>CartProvider</div>
    )
}

export default CartProvider