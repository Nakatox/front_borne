import React from 'react'
import { Ingredient } from '../../Interface/Ingredient'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { DeleteIngredient, UpdateIngredient } from '../../Services/IngredientAPI'
import { useState } from 'react'
import { ButtonDelete, ButtonEdit } from '../../Style/Components/Button'
import { StyledPopup } from '../../Style/Components/Container'
import AddIngredient from './AddIngredient'


const IngredientA = (props:any):JSX.Element => {

    const inrgedientDisplay = props.ingredient as Ingredient
    let onDelete = props.onDelete

    const deleteIngredient = async (ingredient: Ingredient) => {
        let response = await DeleteIngredient(ingredient.id)
        onDelete(ingredient.id)
    }

    
    return (
        <InrgedientContainer>
            <div>{inrgedientDisplay.name}</div>
            <div>{inrgedientDisplay.price} €</div>
            <div>Stock :{inrgedientDisplay.stock.quantity}</div>
            <StyledPopup trigger={<ButtonEdit >Edit<img style={{width:"25px",marginLeft:"10px",filter: "invert(87%) sepia(13%) saturate(1061%) hue-rotate(351deg) brightness(104%) contrast(101%)"}} src='/assets/icons/edit.svg' /></ButtonEdit>} position="right center" modal nested>
                {(close:any) => (     
                    <AddIngredient ingredient={inrgedientDisplay} param={"edit"} close={close}/>  
                )}
            </StyledPopup>
            <ButtonDelete onClick={()=>{deleteIngredient(inrgedientDisplay)}}>Delete</ButtonDelete>
        </InrgedientContainer>
        
    )

}

const InrgedientContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff5d5;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    border: 1px solid #326E2F;
    width: 300px;
    font-size: 20px;
`



export default IngredientA