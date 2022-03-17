import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../Components/Admin/Header'
import IngredientA from '../../Components/Admin/IngredientA'
import { Ingredient } from '../../Interface/Ingredient'
import { GetIngredients } from '../../Services/IngredientAPI'
import styled from 'styled-components'
import { ButtonAdd, ButtonEdit } from '../../Style/Components/Button'
import { ContainerWrap, StyledPopup } from '../../Style/Components/Container'
import AddIngredient from '../../Components/Admin/AddIngredient'
import { useContext } from 'react'
import { IngredientContext } from '../../Provider/IngredientProvider'

const IngredientsA = (): JSX.Element => {

    
    let {ingredientP} = useContext(IngredientContext)

    const [ingredients, setIngredients] = useState([])

    const getIngredients = async () => {
        const response = await GetIngredients()
        setIngredients(response)
    }

    useEffect(() => {
        getIngredients()
    }, [ingredientP])

    const onDelete = (id: number) => {
        setIngredients(ingredients.filter((ingredient: Ingredient) => ingredient.id !== id))        
    }


    return (
        <div>
        <Header />
        <div>

            <StyledPopup trigger={<ButtonAdd >Create a Ingredient</ButtonAdd>} position="right center" modal nested>
                {(close:any) => (     
                    <AddIngredient inrgedient={null} param={"add"} close={close}></AddIngredient>
                )}
                    
                </StyledPopup>
        </div>
        <ContainerWrap>
            {ingredients.map((ingredient: Ingredient, index: number) => {                
                return (
                    <IngredientA key={index} ingredient={ingredient} onDelete={onDelete} />
                )
            })}
        </ContainerWrap>
            
        </div>
    )
}


export default IngredientsA