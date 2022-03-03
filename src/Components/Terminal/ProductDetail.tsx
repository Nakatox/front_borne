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
        <ProductContainer>
            <h1>Custom your Pizza</h1>
            <p>{product.name}</p>
            <IngredientContainer>
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
            </IngredientContainer>
            <div>
                <Popup trigger={<ButtonAdd>Add ingredient</ButtonAdd>} position="right center" nested>
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
                <ButtonAddCart onClick={addToCart}>Add to cart</ButtonAddCart>
            </div>
        </ProductContainer>
    )
}

const IngredientContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;
const IngredientContent = styled.div`
    display: flex;
    flex-direction: row;
    border: 2px solid #BCD379;
    border-radius: 5px;
    margin: 10px;
    background-color: white;
    box-shadow:
        0px 0px 0.8px rgba(0, 0, 0, 0.036),
        0px 0px 2.7px rgba(0, 0, 0, 0.054),
        0px 0px 12px rgba(0, 0, 0, 0.09)
    ;
    `;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;

const ButtonAdd = styled.button`
    background-color: #FEE69C;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 10px;
    font-size: 20px;
    cursor: pointer;
    border: 2px solid #FEE69C;
    &:hover {
        border-color: #326E2F;
    }
    `;
const ButtonAddCart = styled.button`
    background-color: #326E2F;
    border-radius: 10px;
    color: white;
    padding: 5px 10px;
    margin: 10px;
    font-size: 20px;
    cursor: pointer;
    border: 2px solid #326E2F;
    &:hover {
        border-color: #E6E6E6;
    }
`;
    
const IngredientInList = styled.div`
    cursor: pointer;
    &:hover {
        background-color: #FEE69C;
    }
    `;
export default ProductDetail