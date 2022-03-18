import React from 'react'
import { Product } from '../../Interface/Product'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import ProductDetail from './ProductDetail'
import 'reactjs-popup/dist/index.css';
import { Ingredient } from '../../Interface/Ingredient'
import { useContext } from 'react'
import { IngredientContext } from '../../Provider/IngredientProvider'
import { ButtonAddDisabled ,ButtonAdd } from '../../Style/Components/Button'
import { ProductContainer, ProductContainerDisabled, StyledPopup } from '../../Style/Components/Container'
import { useEffect } from 'react'


const ProductComponent = (props: any): JSX.Element => {

    let {ingredientP, setIngredients} = useContext(IngredientContext)

    const product: Product = props.product
    const alreadyExist: Boolean = props.alreadyExist
    const ingredients: Array<Ingredient> = (typeof props.ingredients === 'undefined') ? [] : props.ingredients
    const totPrice: number = (typeof props.totPrice !== 'undefined') ? props.totPrice : product.price
    const index: number = (typeof props.index !== 'undefined') ? props.index : undefined

    useEffect(() => {
    }, [ingredientP])

    const checkAvailability = (): any => {    
        
        let available: Boolean = true    
        if (alreadyExist) {
            return true
        }
        Object.entries(product.productHasIngredients).map((data: any) => {
            ingredientP.map((data2: any) => {
                if (data[1].ingredient.id === data2.id) {
                    if (data2.stock.quantity < 5 ) {
                        available = false
                    }
                }
            })
        })
        return available
    }
    if (checkAvailability() && ingredientP) {
        return (
            <ProductContainer>
                <img src="/assets/images/pizza.png" alt="pizza image" />
                <p>{product.name}</p>
                <p>{totPrice} €</p>
                <StyledPopup trigger={alreadyExist ? <ButtonAdd>Modify<img style={{width:"25px",marginLeft:"10px",filter: "invert(87%) sepia(13%) saturate(1061%) hue-rotate(351deg) brightness(104%) contrast(101%)"}} src='/assets/icons/edit.svg' /></ButtonAdd> : <ButtonAdd >Add to cart<img style={{width:"25px",marginLeft:"10px",filter: "invert(87%) sepia(13%) saturate(1061%) hue-rotate(351deg) brightness(104%) contrast(101%)"}} src='/assets/icons/plus.svg' /></ButtonAdd>} position="right center" modal nested>
                {(close:any) => (     
                    <div key={alreadyExist ? product.id + "productCart" : product.id + "productSolo"}>      
                        <ProductDetail index={index} close={close} product= {product} ingredientTemp={ingredients} priceTemp= {totPrice} alreadyExist= {alreadyExist} ></ProductDetail>
                        <img src="/assets/icons/close.svg" alt="" onClick={close} style={{cursor:"pointer", width:"30px", position:"absolute", right:"10px", top:"10px"}}/>      
                    </div>    
                )}
                    
                </StyledPopup>
            </ProductContainer>
        )
    } else {
        return (
            <ProductContainerDisabled>
                <p>{product.name}</p>
                <p>{totPrice} €</p>
                {alreadyExist ? <ButtonAddDisabled>Modify</ButtonAddDisabled> : <ButtonAddDisabled >Out of stock</ButtonAddDisabled>}
            </ProductContainerDisabled>
        )
    }
}


export default ProductComponent