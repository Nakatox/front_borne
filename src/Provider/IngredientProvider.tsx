import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { GetIngredients } from '../Services/IngredientAPI'
import {io } from 'socket.io-client'
import { useContext } from 'react'
import { CartContext } from './CartProvider'
import { Ingredient } from '../Interface/Ingredient'


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
        if (!isLoaded) {
            getIngredients()
        }
    }, [])

    useEffect(() => {
        const socket = io("http://localhost:8000");
        socket.off('stockUpdate').on("stockUpdate", (data) => {    
            setIngredients(ingredientP.map((ingredient: Ingredient) => {
                if (ingredient.id === data.ingredient.id) {
                    ingredient.stock.quantity = data.quantity
                    return ingredient
                }
                return ingredient
            }))
            if (data.quantity< 5){
                setCart(cart.products.filter((product: any) => product.ingredient[0].id !== data.ingredient.id))
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