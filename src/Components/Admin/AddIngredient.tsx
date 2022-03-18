import React from 'react'
import { useForm } from 'react-hook-form'
import { CreateIngredient, DeleteIngredient, UpdateIngredient } from '../../Services/IngredientAPI'
import { useState } from 'react'
import { ButtonDelete, ButtonEdit } from '../../Style/Components/Button'
import { useContext } from 'react'
import { IngredientContext } from '../../Provider/IngredientProvider'


const AddIngredient = (props:any) => {

    const ingredient = props.ingredient
    const param = props.param
    // const setIngredient = props.setIngredient
    const close = props.close

    let {ingredientP, setIngredients} = useContext(IngredientContext)


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isRemovable, setIsRemovable] = useState(true)
 
    const onSubmit = async (data: any) => {

        if (param == "edit"){
            const response = await UpdateIngredient(data.name, data.price, ingredient.id, data.stock, isRemovable)
            // setIngredient(response)
        } else {
            const response = await CreateIngredient(data.name, data.price, data.stock, isRemovable)
            setIngredients([...ingredientP, response])
        }
        close()
    }
  return (
    <div>      
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Name :</p>
            <input type="text" defaultValue={param == "edit" ? ingredient.name: ""} {...register("name", {required:true})} />
            <p>Price :</p>
            <input type="number" defaultValue={param == "edit" ?ingredient.price: ""} {...register("price", {required:true})}/>
            <p>Stock :</p>
            <input type="number" defaultValue={param == "edit" ?ingredient.stock.quantity: ""} {...register("stock", {required:true})}/>
            <p>Removable :</p>
            {param == "edit" ? <input type="checkbox" defaultChecked={ingredient.isRemovable} onChange={() => setIsRemovable(!isRemovable)}/> : <input type="checkbox" onChange={() => setIsRemovable(!isRemovable)}/>}

            <ButtonEdit type="submit">{param == "edit" ? "Edit" : "Add"}</ButtonEdit>

            {errors.email && <span>This field is required</span>}
            {errors.password && <span>This field is required</span>}
        </form>
    </div>  
  )
}

export default AddIngredient