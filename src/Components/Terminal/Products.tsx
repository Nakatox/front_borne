import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { GetProducts } from '../../Services/ProductAPI'
import ProductComponent from './ProductComponent'
import { Product } from '../../Interface/Product'
import styled from 'styled-components'
import { ContainerWrap } from '../../Style/Components/Container'
import { useContext } from 'react'
import { IngredientContext } from '../../Provider/IngredientProvider'


const Products = (): JSX.Element => {
    
    const [products, setProducts] = useState([])
    let {ingredientP, setIngredients} = useContext(IngredientContext)



    const getProducts = async () => {
        const response = await GetProducts();
        if (response) {
            setProducts(response)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <ContainerWrap>
            {products.map((product: Product, index:number) => {
                return <ProductComponent key={index} index={undefined} product={product} alreadyExist={false}></ProductComponent>
            })}
        </ContainerWrap>
    )
}


export default Products