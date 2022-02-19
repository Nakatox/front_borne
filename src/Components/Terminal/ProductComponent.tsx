import React from 'react'
import { Product } from '../../Interface/Product'

const ProductComponent = (props: any): JSX.Element => {
    return (
        <div>
            <h1>{props.product.name}</h1>
        </div>
    )
}

export default ProductComponent