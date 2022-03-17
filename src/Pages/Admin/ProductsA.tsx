import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../Components/Admin/Header'
import ProductA from '../../Components/Admin/ProductA'
import { GetProducts } from '../../Services/ProductAPI'
import styled from 'styled-components'
import CreateProduct from '../../Components/CreateProduct'
import Popup from 'reactjs-popup'
import { ButtonEdit } from '../../Style/Components/Button'
import { ContainerFlexColumn } from '../../Style/Components/Container'
import { Product } from '../../Interface/Product'


const ProductsA = ():JSX.Element => {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const response = await GetProducts();
        setProducts(response)
    }

   const onDelete = (id: number) => {
       setProducts(products.filter((product:Product) => product.id !== id))
    }

    const onCreate = (product: Product) => {
        setProducts([...products, product])
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <div>
            <Header/>
            <h1>Products</h1>

            <Popup trigger={<ButtonEdit>Add a product</ButtonEdit>} position="right center" modal nested>
                {(close:any) => (
                    <CreateProduct onCreate={onCreate} close={close}/>
                )}
            </Popup>
            <ContainerFlexColumn>
                {products.map((product: any, index:number) => {
                    return (
                        <ProductA key={index} product={product} onDelete= {onDelete} />
                    )
                })}
            </ContainerFlexColumn>
            
            </div>
    )
}


export default ProductsA