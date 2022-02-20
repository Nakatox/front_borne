import React from 'react'
import { Product } from '../../Interface/Product'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import ProductDetail from './ProductDetail'
import 'reactjs-popup/dist/index.css';
import { Ingredient } from '../../Interface/Ingredient'


const ProductComponent = (props: any): JSX.Element => {
    const product: Product = props.product
    const alreadyExist: Boolean = props.alreadyExist
    const ingredients: Array<Ingredient> = (typeof props.ingredients === 'undefined') ? [] : props.ingredients
    const totPrice: number = (typeof props.totPrice !== 'undefined') ? props.totPrice : product.price
    const index: number = (typeof props.index !== 'undefined') ? props.index : undefined
    
    return (
        <ProductContainer>
            <p>{product.name}</p>
            <p>{totPrice} $</p>
            <StyledPopup trigger={alreadyExist ? <ButtonAddCart>Modify</ButtonAddCart> : <ButtonAddCart >Add to cart</ButtonAddCart>} position="right center" modal nested>
            {(close:any) => (     
                <div>      
                    <ProductDetail key={product.id} index={index} product= {product} ingredientTemp={ingredients} priceTemp= {totPrice} alreadyExist= {alreadyExist} ></ProductDetail>
                    <img src="/assets/icons/close.svg" alt="" onClick={close} style={{cursor:"pointer", width:"30px", position:"absolute", right:"10px", top:"10px"}}/>      
                </div>    
            )}
                
            </StyledPopup>
            
        </ProductContainer>
    )
}

const StyledPopup = styled(Popup)`
    &-overlay {
    }  
    &-content {
        border-color: #BCD379;
        border-width: 2px;
        border-radius: 10px;
    }
  `;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #BCD379;
    border-radius: 5px;
    width: 200px;
    margin: 10px;
    background-color: white;
    box-shadow:
        0px 0px 0.8px rgba(0, 0, 0, 0.036),
        0px 0px 2.7px rgba(0, 0, 0, 0.054),
        0px 0px 12px rgba(0, 0, 0, 0.09)
    ;
    & > p:nth-child(1) {
        font-size: 30px
    }
    ` 

const ButtonAdd = styled.button`
    background-color: #326E2F;
    color: white;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 10px;
    font-size: 20px;
    cursor: pointer;
    border: 2px solid #326E2F;
    &:hover {
        border-color: #E6E6E6;
    }
    `

const ButtonAddCart = styled.button`
background-color: #326E2F;
border-radius: 10px;
color: white;
padding: 5px 10px;
margin: 10px;
font-size: 20px;
cursor: pointer;
border: 2px solid #326E2F;
&:hover {
    border-color: #E6E6E6;
}
`;

export default ProductComponent