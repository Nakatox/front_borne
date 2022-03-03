import React from 'react'
import { Order } from '../../Interface/Order'
import { Product } from '../../Interface/Product'
import { DoneOrder } from '../../Services/OrderAPI'
import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'


const OrderDetail = (props: any): JSX.Element => {
    
    const  order  = props.order
    let orderTimeCreated = new Date(order.createdAt)
    
    
    const [timeElapsedStringState, setTimeElapsedStringState] = useState([])
    const [done, setDone] = useState(false)
    
    useEffect(() => {
        let interval = setInterval(() => {
            let timeElapsed = (new Date().getTime() - orderTimeCreated.getTime()) / 1000 / 60
            let minutes = Math.floor(timeElapsed)
            let seconds = Math.floor((timeElapsed - minutes) * 60)
            let timeElapsedString = `${minutes} : ${seconds}`
            setTimeElapsedStringState(timeElapsedString)
        }
        , 1000)
    })

    const actionDone = async () => {
        const response = await DoneOrder(order.id)
    }
    
    return (
        <div>
        {(order.state != null && order.state.id == 1) && 
            <OrderContainer>
                <p>Order N°{order.orderNumber}</p>
    
                {Object.entries(order.orderHasProducts).map((value:any ) => {
                    let product = value[1].product;
                    return (
                        <ProductContainer onClick={()=>{setDone(!done)}}>
                            <p>{product.name}</p>
                            <div>
                                {product.productHasIngredients.map((ingredientRef: any) => {
                                    return (
                                        <p>
                                            {ingredientRef.ingredient.name}
                                        </p>
                                    )
                                })}
                            </div>
                        </ProductContainer>
                    )
                })} 
                <ButtonFinished onClick={()=>{actionDone()}}>Finished</ButtonFinished>
                <p style={{alignSelf:"center"}}>{timeElapsedStringState}</p>
                
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
    cursor: pointer;

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

const ButtonFinished = styled.button`
    background-color: #326E2F;
    border-radius: 10px;
    color: white;
    padding: 5px 10px;
    margin: 10px;
    margin-top: 20px;
    font-size: 20px;
    cursor: pointer;
    border: 2px solid #326E2F;
    &:hover {
        border-color: #E6E6E6;
    }
`;

export default OrderDetail