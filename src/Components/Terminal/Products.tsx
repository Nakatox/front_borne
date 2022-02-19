import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { GetProducts } from '../../Services/ProductAPI'
import ProductComponent from './ProductComponent'
import { Product } from '../../Interface/Product'


const Products = (): JSX.Element => {
    
    const [products, setProducts] = useState([])


    const getProducts = async () => {
        const response = await GetProducts();
        if (response.data) {
            setProducts(response.data)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <div>
            {products.map((product: Product) => {
                return <ProductComponent key={product.id} product={product}></ProductComponent>
            })}
        </div>
    )
}

export default Products