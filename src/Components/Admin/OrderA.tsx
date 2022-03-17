import React from 'react'
import { Order } from '../../Interface/Order'
import styled from 'styled-components'


const OrderA = (props:any): JSX.Element => {

    const order = props.order
    
    return (
        <div>
            {(order.state != null) && 
            <OrderContainer>
                <p>Order N°{order.orderNumber}</p>
    
                {Object.entries(order.orderHasProducts).map((value:any, index:number ) => {
                    let product = value[1].product;
                    return (
                        <ProductContainer key={index}>
                            <p>{product.name}</p>
                            <div>
                                {product.productHasIngredients.map((ingredientRef: any, index:number) => {
                                    return (
                                        <p key={index}>
                                            {ingredientRef.ingredient.name}
                                        </p>
                                    )
                                })}
                            </div>
                        </ProductContainer>
                    )
                })} 
                <p>{order.createdAt}</p>
                <p>{order.totalPrice} €</p>
            </OrderContainer>
        }
        </div>
    )
}


const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
    border: 2px solid #BCD379;
    border-radius: 5px;
    margin: 10px;
    background-color: white;
    box-shadow:
        0px 0px 0.8px rgba(0, 0, 0, 0.036),
        0px 0px 2.7px rgba(0, 0, 0, 0.054),
        0px 0px 12px rgba(0, 0, 0, 0.09)
    ;
    & > p:nth-child(1) {
        font-size: 15px
    }
    
`
const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p:nth-child(1) {
        font-size: 30px;
    }
    & > div {
        font-size: 20px;
        width: 90%;
        border: 2px solid #BCD379;
        border-radius: 5px;
        padding: 10px;
        & > p {
            border-bottom: 2px solid #bdc3a9;
            padding: 10px;
        }
    }
    `

export default OrderA