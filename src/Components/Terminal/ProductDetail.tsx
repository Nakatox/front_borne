import React from 'react'
import { Product } from '../../Interface/Product'
import styled from 'styled-components'
import { Ingredient } from '../../Interface/Ingredient'
import { useState } from 'react'
import { useEffect } from 'react'
import { GetIngredients } from '../../Services/IngredientAPI'
import Popup from 'reactjs-popup'
import { useContext } from 'react'
import { CartContext } from '../../Provider/CartProvider'
import { IngredientContext } from '../../Provider/IngredientProvider'
import { ContainerFlexColumn, IngredientContent, IngredientInList } from '../../Style/Components/Container'
import { ButtonAdd } from '../../Style/Components/Button'

const ProductDetail = (props: {product: Product, ingredientTemp: Array<Ingredient>, priceTemp: number, alreadyExist: Boolean, index:number}): JSX.Element => {

    const product = props.product
    const ingredientTemp = props.ingredientTemp
    const priceTemp = props.priceTemp
    const alreadyExist = props.alreadyExist
    const index = props.index

    let {cart, setCart} = useContext(CartContext)
    let {ingredientP, setIngredients} = useContext(IngredientContext)

    let [ingredients, setIngredientsDisplay] = useState(ingredientTemp)
    const [allIngredients, setAllIngredients] = useState([])
    let [price, setPrice] = useState(priceTemp === 0 ? product.price: priceTemp)

    const insertIngredient = (): void => {
        if (ingredients.length === 0) {
            product.productHasIngredients.map((data: any) => {
                setIngredientsDisplay(ingredients = [...ingredients, data.ingredient])
            })
        }
    }

    const getAllIngredients = async (): Promise<void> => {
        setAllIngredients(ingredientP.filter((data: Ingredient) => data.stock.quantity > 5))   
    }


    const updateIngredient = (action:Boolean, ingredient: Ingredient): void => {
        if (action) {
            setIngredientsDisplay(ingredients = ingredients.filter((data: Ingredient) => data.id !== ingredient.id))
            updatePrice(true, ingredient)
        } else {
            setIngredientsDisplay(ingredients = [...ingredients, ingredient])
            updatePrice(false, ingredient)
        }
    }

    const updatePrice = (action: Boolean, ingredientAdded: Ingredient): void => {
        if (!action){                     
            if (product.productHasIngredients.find((data: any) => data.ingredient.id === ingredientAdded.id) == undefined) {
                setPrice(price = price + ingredientAdded.price)
            }
        }else{
            if (product.productHasIngredients.find((data: any) => data.ingredient.id === ingredientAdded.id) == undefined) {
                setPrice(price = price - ingredientAdded.price)
            }
        }
    }

    const addToCart = () => {
        
        if (alreadyExist) {            
            setCart({
                products : [...cart.products.filter((data: any, i: number) => i !== index), [product, ingredients, price]],
                totPrice : (cart.totPrice - product.price) + price
            })
        } else {
            setCart({
                products: [...cart.products, [product, ingredients, price]], 
                totPrice: cart.totPrice + price
            })
        }
    }

    useEffect(() => {
        insertIngredient()        
        getAllIngredients()
    }, [])
    

    return (
        <ContainerFlexColumn>
            <h1>Custom your Pizza</h1>
            <p>{product.name}</p>
            <ContainerFlexColumn>
                {ingredients.map((ingredient: Ingredient ) => {
                    if (ingredient.isRemovable) {
                        return(
                            <IngredientContent key={ingredient.id}>
                                <p>{ingredient.name}</p>
                                <img src="/assets/icons/close.svg" alt="" onClick={() => {updateIngredient(true, ingredient)}} style={{cursor:"pointer", width:"30px"}}/>
                            </IngredientContent>
                        )
                    }
                })}
            </ContainerFlexColumn>
            <div>
                <Popup trigger={<ButtonAdd >Add ingredient</ButtonAdd>} position="right center" nested>
                    {allIngredients.map((ingredient: Ingredient) => {                        
                        if (ingredients.find((data: any) => data.id === ingredient.id) == undefined) {
                            return(
                                <IngredientInList key={ingredient.id} onClick={()=>{updateIngredient(false, ingredient)}} >
                                    <p>{ingredient.name}</p>
                                </IngredientInList>
                            )
                        }
                    })}
                </Popup>
            </div>
            <div style= {{display:"flex", alignItems:"center"}}>
                <p>Price: {price} $</p>
                <ButtonAdd onClick={addToCart}>Add to cart</ButtonAdd>
            </div>
        </ContainerFlexColumn>
    )
}
    

export default ProductDetail