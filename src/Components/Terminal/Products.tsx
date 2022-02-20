import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { GetProducts } from '../../Services/ProductAPI'
import ProductComponent from './ProductComponent'
import { Product } from '../../Interface/Product'
import styled from 'styled-components'


const Products = (): JSX.Element => {
    
    const [products, setProducts] = useState([])


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
        <ProductContainer>
            {products.map((product: Product) => {
                return <ProductComponent key={product.id} product={product}></ProductComponent>
            })}
        </ProductContainer>
    )
}

const ProductContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    `

export default Products