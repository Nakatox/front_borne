import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { GetIngredients } from '../Services/IngredientAPI'
import {io } from 'socket.io-client'
import { useContext } from 'react'
import { CartContext } from './CartProvider'


export const IngredientContext = createContext()


const IngredientProvider = (props: any): JSX.Element => {


    let [ingredientP, setIngredients] = useState([])
    const [isLoaded, setisLoaded] = useState(false)
    let {cart, setCart} = useContext(CartContext)
    

    const getIngredients = async() => {
        const response = await GetIngredients()
        setIngredients(response)
        setisLoaded(true)
    }

    useEffect(()=>{
        getIngredients()
    }, [])

    useEffect(() => {
        const socket = io("http://localhost:8000");
        socket.off('stockUpdate').on("stockUpdate", (data) => {
            if (data.quantity < 5){
                setIngredients(ingredientP.map((ingredient: any) => {
                    if (ingredient.id === data.ingredient){
                        ingredient.stock = data.quantity
                    }
                    return ingredient
                }))
                setCart(cart.products.filter((product: any) => product.ingredient[0].id !== data.ingredient))
            }
        });
    }, [isLoaded])


    return (
        <IngredientContext.Provider value={{ingredientP, setIngredients}}>
            {props.children}
        </IngredientContext.Provider>
    )
}

export default IngredientProvider