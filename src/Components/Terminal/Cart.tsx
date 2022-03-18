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
import { NavLink, useNavigate } from 'react-router-dom'
import { ContainerFlexColumn, ContainerWrap } from '../../Style/Components/Container'
import { ButtonAdd } from '../../Style/Components/Button'


const Cart = () => {

    let {cart, setCart} = useContext(CartContext)

    const navigate = useNavigate()

    const removeFromCart = (index:number, price:number) => {
        setCart({
            products: [...cart.products.filter((data: any, i: number) => i !== index)],
            totPrice: cart.totPrice - price
        })  
    }
    
    return (
        <ContainerFlexColumn>
            <ContainerWrap>
                {cart.hasOwnProperty('products') && 
                    cart.products.map((data:any, index:number) => {     
                        return(
                            <div key={index} >
                                <ProductComponent index={index} product={data[0]} ingredients={data[1]} totPrice={data[2]} alreadyExist={true}></ProductComponent>
                                <img src="/assets/icons/close.svg" alt="" onClick={() => {removeFromCart(index, data[2])}} style={{cursor:"pointer", width:"30px"}}/>
                            </div>

                        )
                    })
                }
            </ContainerWrap>
            <h1>For a total of {cart.totPrice} €</h1>
            <ButtonAdd onClick={()=>{navigate('/terminal/order')}}>Pay<img style={{width:"25px",marginLeft:"10px",filter: "invert(87%) sepia(13%) saturate(1061%) hue-rotate(351deg) brightness(104%) contrast(101%)"}} src='/assets/icons/pay.svg' /></ButtonAdd>
        </ContainerFlexColumn>
    )
}


export default Cart