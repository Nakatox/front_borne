import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { Ingredient } from '../../Interface/Ingredient'
import { Product } from '../../Interface/Product'
import { ProductHasIngredients } from '../../Interface/ProductHasIngredients'
import { IngredientContext } from '../../Provider/IngredientProvider'
import { UpdateIngredient } from '../../Services/IngredientAPI'
import { DeleteProducts, UpdateProducts } from '../../Services/ProductAPI'
import { ButtonAdd, ButtonDelete, ButtonEdit } from '../../Style/Components/Button'
import { ContainerFlexColumn, IngredientContent, IngredientInList, StyledPopup } from '../../Style/Components/Container'


const ProductA = (props: any):JSX.Element => {


    let {ingredientP, setIngredients} = useContext(IngredientContext)

    
    let [product, setProduct] = useState(props.product as Product)
    let productDisplay = props.product
    let [productTemp, setProductTemp] = useState(props.product as Product)
    let onDelete = props.onDelete

    const { register, handleSubmit, formState: { errors } } = useForm();
 
    const onSubmit = async (data: any) => {
        productTemp.name = data.name
        productTemp.price = data.price
        
        setProduct(productDisplay = productTemp)
        setProductTemp(productTemp = productDisplay)

        let productHasIngredients: Array<Ingredient> = []
        productDisplay.productHasIngredients.map((data: any) => {

            productHasIngredients.push(data.ingredient)
        })
        
        let response = await UpdateProducts(productDisplay, productHasIngredients)

    }

    const updateIngredient = (action: boolean, ingrdientToAdd: Ingredient) => {
        if (action) {                
            setProductTemp(productTemp = {...productTemp, productHasIngredients: productTemp.productHasIngredients.filter((productHasIngredients: ProductHasIngredients) => productHasIngredients.ingredient.id !== ingrdientToAdd.id)})
            
        } else {
            setProductTemp(productTemp = {...productTemp, productHasIngredients: [...productTemp.productHasIngredients, {ingredient: ingrdientToAdd}]})
        }
    }

    const deleteProduct = async (product: Product) => {
        onDelete(product.id)
        let response = await DeleteProducts(product)
    }


    return (
        <ProductContainer>
            <p>{productDisplay.name}</p>
            <p>{productDisplay.price} €</p>
            <IngredientContainer>            
                {productDisplay.productHasIngredients.map((productHasIngredients: ProductHasIngredients, index: number) => {
                    return (
                        <p key={index}>{productHasIngredients.ingredient.name}</p>
                    )
                })}
            </IngredientContainer>

            <div>
            <StyledPopup trigger={<ButtonEdit>Edit</ButtonEdit>} position="right center" modal nested>
                {(close:any) => (     
                    <div>      
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p>Name :</p>
                            <input type="text" defaultValue={productDisplay.name} {...register("name", {required:true})} />
                            <p>Price :</p>
                            <input type="number" defaultValue={productDisplay.price} {...register("price", {required:true})}/>
                            <ContainerFlexColumn>
                                {productTemp.productHasIngredients.map((productHasIngredients: ProductHasIngredients, index:number ) => {
                                    let actualIngredient = productHasIngredients.ingredient
                                    if (actualIngredient.isRemovable) {
                                        return(
                                            <IngredientContent key={index}>
                                                <p>{actualIngredient.name}</p>
                                                <img src="/assets/icons/close.svg" alt="" onClick={() => {updateIngredient(true, actualIngredient)}} style={{cursor:"pointer", width:"30px"}}/>
                                            </IngredientContent>
                                        )
                                    }
                                })}
                            </ContainerFlexColumn>
                            <Popup trigger={<ButtonAdd type="button">Add ingredient</ButtonAdd>} position="right center" nested>
                                {ingredientP.map((ingredient: Ingredient, index:number) => {           
                                    if (productTemp.productHasIngredients.find((data: any) => data.ingredient.id === ingredient.id) == undefined) {
                                        return(
                                            <IngredientInList key={index} onClick={()=>{updateIngredient(false, ingredient)}} >
                                                <p>{ingredient.name}</p>
                                            </IngredientInList>
                                        )
                                    }
                                })}
                            </Popup>
                            <ButtonEdit type="submit">Edit<img style={{width:"25px",marginLeft:"10px",filter: "invert(87%) sepia(13%) saturate(1061%) hue-rotate(351deg) brightness(104%) contrast(101%)"}} src='/assets/icons/edit.svg' /></ButtonEdit>

                            {errors.name && <span>This field is required</span>}
                            {errors.price && <span>This field is required</span>}
                        </form>
                    </div>    
                )}
            </StyledPopup>
                <ButtonDelete onClick={()=>(deleteProduct(productDisplay))}>Delete</ButtonDelete>
            </div>
        </ProductContainer>
    )
}

const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: space-around;
    border:2px solid #326E2F;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    width: 80%;
    background-color:#fff5d5;
    & > p:nth-child(1){
        font-size: 30px;
    }
    & > p:nth-child(2){
        font-size: 20px;
    }

`

const IngredientContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-items: space-between;
    border: 1px solid #BCD379;
    padding: 10px;
    border-radius: 10px;
`
export default ProductA