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
import { toast } from 'react-toastify';
import { ButtonAdd, ButtonAddIngredient } from '../Style/Components/Button';
import { IngredientContent, IngredientInList } from '../Style/Components/Container';


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
        if (data.name.length >= 3 && ingredients.length >= 1) {
            let createdProduct = {
                name:data.name,
                price: isAdmin ? data.price : data.price + 9,
                ingredients:ingredients,
                picture: data.picture
            }
            let createdProduct2 = [
                {
                    id:999,
                    name:data.name,            
                    price:isAdmin ? customPrice : customPrice + 9,
                    isCustom:true,
                    picture: "undefined",
                    companyId:1,
                    productHasIngredients: ingredients
                },
                ingredients,
                isAdmin ? customPrice : customPrice + 9
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
            toast.success(`${isAdmin ? "Product Created" : "Product added in the cart"}`,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            close()
        } else {
            toast.error("Please fill all the fields correctly", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
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
            <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
                <h2>Name :</h2>
                <input type="text" defaultValue="Pizza" {...register("name", {required:true})} />
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
                    <Popup trigger={<ButtonAddIngredient type="button">Add ingredient</ButtonAddIngredient>} position="right center" nested>
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

                <ButtonAdd type="submit"> Create </ButtonAdd>

                {errors.name && <span>This field is required</span>}
                {errors.price && <span>This field is required</span>}
                {errors.picture && <span>This field is required</span>}
            </form>
        </div>
    )
}


const IngredientContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;
export default CreateProduct