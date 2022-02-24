import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { GetIngredients } from '../Services/IngredientAPI'


export const IngredientContext = createContext()


const IngredientProvider = (props: any): JSX.Element => {


    const [ingredientP, setIngredients] = useState([])

    const getIngredients = async() => {
        const response = await GetIngredients()
        setIngredients(response)
    }

    useEffect(()=>{
        getIngredients()
    }, [])


    return (
        <IngredientContext.Provider value={{ingredientP, setIngredients}}>
            {props.children}
        </IngredientContext.Provider>
    )
}

export default IngredientProvider