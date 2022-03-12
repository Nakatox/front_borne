import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../Components/Admin/Header'
import IngredientA from '../../Components/Admin/IngredientA'
import { Ingredient } from '../../Interface/Ingredient'
import { GetIngredients } from '../../Services/IngredientAPI'
import styled from 'styled-components'
import { ButtonEdit } from '../../Style/Components/Button'
import { ContainerWrap } from '../../Style/Components/Container'

const IngredientsA = () => {

    const [ingredients, setIngredients] = useState([])

    const getIngredients = async () => {
        const response = await GetIngredients()
        setIngredients(response)
    }

    useEffect(() => {
        getIngredients()
    }, [])

    const onDelete = (id: number) => {
        setIngredients(ingredients.filter((ingredient: Ingredient) => ingredient.id !== id))        
    }


    return (
        <div>
        <Header />
        <div>
            <ButtonEdit>Add ingredient</ButtonEdit>
        </div>
        <ContainerWrap>
            {ingredients.map((ingredient: Ingredient) => {                
                return (
                    <IngredientA key={ingredient.id} ingredient={ingredient} onDelete={onDelete} />
                )
            })}
        </ContainerWrap>
            
        </div>
    )
}


export default IngredientsA