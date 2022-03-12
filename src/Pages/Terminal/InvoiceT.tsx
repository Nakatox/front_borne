import React from 'react'
import styled from 'styled-components'
import { useContext } from 'react'
import { CartContext } from '../../Provider/CartProvider'
import { Ingredient } from '../../Interface/Ingredient'
import { NavLink, useNavigate } from 'react-router-dom'
import { CreateOrder } from '../../Services/OrderAPI'

const InvoiceT = (): JSX.Element => {

    let {cart, setCart} = useContext(CartContext)

    const navigate = useNavigate()

    const PayOrder = async () => {
        for (let index = 0; index < cart.products.length; index++) {
            const element = cart.products[index];
            element["isCustom"] = (element[2] != element[0].price || element[1].length != element[0].productHasIngredients.length)
            setCart({
                products: [...cart.products.filter((data: any, i: number) => i !== index), element],
                totPrice: cart.totPrice
            })
        }

        const response = await CreateOrder(cart.products, cart.totPrice)

        navigate("/terminal/order/done/" + response.orderNumber)
        
    }
    

    return (
        <RecapContainer>
            <p><NavLink to="/terminal">back</NavLink></p>
            <h1>Recap of your order</h1>
            {cart.products.map((data:any) => {
                return (
                    <ProductContainer>
                        <p>{data[0].name}</p>
                        <p>{data[2]} $</p>
                        <IngredientContainer>
                            {data[1].map((ingredient:Ingredient) => {
                                return (
                                    <p>{ingredient.name} </p>
                                )
                            })}
                        </IngredientContainer>
                    </ProductContainer>
                )
            })}

            <h2>For a total of {cart.totPrice}</h2>
            <button onClick={PayOrder}>Pay</button>
        </RecapContainer>
    )


}
const RecapContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid #BCD379;
    background-color: #FEE69C;
    border-radius: 10px;
    &> p:nth-child(1){
        font-size: 30px;
    }
`;

const IngredientContainer = styled.div`
    display: flex;
    margin: 10px;
    padding: 10px;
    border: 1px solid #BCD379;
    & > p {
        font-size: 20px;
        opacity: 0.8;
        padding: 0 5px;
    }
    `;
export default InvoiceT