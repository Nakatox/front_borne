import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { GetProducts } from '../../Services/ProductAPI'
import ProductComponent from './ProductComponent'
import { Product } from '../../Interface/Product'
import styled from 'styled-components'
import { useContext } from 'react'
import { CartContext } from '../../Provider/CartProvider'
import { Ingredient } from '../../Interface/Ingredient'
import { NavLink } from 'react-router-dom'
import { ContainerFlexColumn, ContainerWrap } from '../../Style/Components/Container'


const Cart = () => {

    let {cart, setCart} = useContext(CartContext)

    const removeFromCart = (index:number, price:number) => {
        setCart({
            products: [...cart.products.filter((data: any, i: number) => i !== index)],
            totPrice: cart.totPrice - price
        })  
    }
    
    return (
        <ContainerFlexColumn>
            <ContainerWrap>
                {cart.products.map((data:any, index:number) => {     
                    return(
                        <div key={index} >
                            <ProductComponent index={index} product={data[0]} ingredients={data[1]} totPrice={data[2]} alreadyExist={true}></ProductComponent>
                            <img src="/assets/icons/close.svg" alt="" onClick={() => {removeFromCart(index, data[2])}} style={{cursor:"pointer", width:"30px"}}/>
                        </div>

                    )
                })}
            </ContainerWrap>
            <h1>For a total of {cart.totPrice}</h1>
            <p ><NavLink to= "/terminal/order">Pay</NavLink></p>
        </ContainerFlexColumn>
    )
}


export default Cart