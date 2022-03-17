import axios from "axios";
import { Ingredient } from "../Interface/Ingredient";
import { GetToken } from "./CheckConnected";

export const GetIngredients = async (): Promise<Array<Ingredient>> => {
    const response = await axios.get(`http://localhost:8000/ingredients`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}

export const CreateIngredient = async (name:String, price:number, stock:number, isRemovable: boolean): Promise<Ingredient> => {
    const response = await axios.post(`http://localhost:8000/ingredients`, {
        name,
        price,
        stock,
        isRemovable
    }, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}

export const UpdateIngredient = async (name: String, price: Number, id: Number, stock: Number): Promise<Ingredient> => {
    const response = await axios.put(`http://localhost:8000/ingredients/${id}`, {
        name: name,
        price: price,
        stock: stock,
        isRemoved: true
    }, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}

export const DeleteIngredient = async (id: Number): Promise<Ingredient> => {
    const response = await axios.delete(`http://localhost:8000/ingredients/${id}`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}