import React from 'react'
import { Ingredient } from '../Interface/Ingredient'
import { Product } from '../Interface/Product'
import { CreateProducts } from '../Services/ProductAPI'
import 'react-toastify/dist/ReactToastify.css';
import { useForm} from "react-hook-form";
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { useContext } from 'react';
import { IngredientContext } from '../Provider/IngredientProvider';
import { CartContext } from '../Provider/CartProvider';
import { useState } from 'react';
import { GetCurrentUser } from '../Services/UserAPI';
import { useEffect } from 'react';


const CreateProduct = (props: any) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    let {ingredientP, setIngredients} = useContext(IngredientContext)
    let {cart, setCart} = useContext(CartContext)
    const [isAdmin , setIsAdmin] = useState(false)
    let [customPrice, setCustomPrice] = useState(0)
    let [ingredients, setIngredientsDisplay] = useState([])
    let onCreate = props.onCreate
    const close = props.close


    useEffect(async () => {
        await GetCurrentUser().then((res: any) => {
            setIsAdmin(res.roleId === 1)
        })
    }, [])

    
    const onSubmit = async (data: any) => {
        let createdProduct = {
            name:data.name,
            price:data.price,
            ingredients:ingredients,
            picture: data.picture
        }
        let createdProduct2 = [
            {
                id:999,
                name:data.name,            
                price:customPrice,
                isCustom:true,
                picture: "undefined",
                companyId:1,
                productHasIngredients: ingredients
            },
            ingredients,
            customPrice
        ]

        if (isAdmin) {
            const response = await CreateProducts(createdProduct)
            onCreate(response)
        } else {
            setCart({
                products: [...cart.products, createdProduct2],
                totPrice: parseInt(cart.totPrice + customPrice)
            })
        }
        close()
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
            setCustomPrice(customPrice = customPrice + ingredientAdded.price)
        }else{
            setCustomPrice(customPrice = customPrice - ingredientAdded.price)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Name :</p>
                <input type="text" defaultValue="root" {...register("name", {required:true})} />
                {isAdmin &&
                    <>
                        <p>Price :</p>
                        <input type="number" {...register("price", {required:true})}/>
                        <p>Picture :</p>
                        <input type="text" {...register("picture", {required:true})}/>
                    </>
                }
                <IngredientContainer>
                {ingredients.map((ingredient: Ingredient, index: number ) => {
                    if (ingredient.isRemovable) {
                        return(
                            <IngredientContent key={index}>
                                <p>{ingredient.name}</p>
                                <img src="/assets/icons/close.svg" alt="" onClick={() => {updateIngredient(true, ingredient)}} style={{cursor:"pointer", width:"30px"}}/>
                            </IngredientContent>
                        )
                    }
                })}
                </IngredientContainer>
                <div>
                    <Popup trigger={<ButtonAdd type="button">Add ingredient</ButtonAdd>} position="right center" nested>
                        {ingredientP.map((ingredient: Ingredient, index:number) => {                        
                            if (ingredients.find((data: any) => data.id === ingredient.id) == undefined) {
                                return(
                                    <IngredientInList key={index} onClick={()=>{updateIngredient(false, ingredient)}} >
                                        <p>{ingredient.name}</p>
                                    </IngredientInList>
                                )
                            }
                        })}
                    </Popup>
                </div>

                <input type="submit" value="Create" />

                {errors.email && <span>This field is required</span>}
                {errors.password && <span>This field is required</span>}
            </form>
        </div>
    )
}

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

const IngredientInList = styled.div`
cursor: pointer;
&:hover {
    background-color: #FEE69C;
}
`;
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
export default CreateProduct