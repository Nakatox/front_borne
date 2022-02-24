import React from 'react'
import { Order } from '../../Interface/Order'
import { Product } from '../../Interface/Product'
import { DoneOrder } from '../../Services/OrderAPI'

const OrderDetail = (props: any): JSX.Element => {

    const  order  = props.order

    const doneOrder = async () => {
        const response = await DoneOrder(order.id)
        console.log(response);
        
    }
    
    return (
        <div>
        {(order.state != null && order.state.id == 1) && 
            <fieldset>
            Order N°{order.orderNumber}
            

            <p>Poducts</p>
            {Object.entries(order.orderHasProducts).map((value:any ) => {
                let product = value[1].product;
                return (
                    <div>
                        {product.name}
                        {product.productHasIngredients.map((ingredientRef: any) => {
                            
                            return (
                                <div>
                                    {ingredientRef.ingredient.name}
                                </div>
                            )
                        })}
                    </div>
                )
            })} 
                <button onClick={()=>{doneOrder()}}>Finished</button>
            
            </fieldset>
        }
        </div>
    )
}


export default OrderDetail