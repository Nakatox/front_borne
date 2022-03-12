import axios from "axios";
import { Ingredient } from "../Interface/Ingredient";
import { Product } from "../Interface/Product";
import { GetToken } from "./CheckConnected";

export const GetProducts = async (): Promise<Array<Ingredient>> => {
    const response = await axios.get(`http://localhost:8000/products`, {
        params: {
            isCustom: false
        },
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}

export const CreateProducts = async ( product: any) => {
    const response = await axios.post(`http://localhost:8000/products`, {
        name: product.name,
        price: product.price,
        picture: product.picture,
        ingredients: product.ingredients
    }, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}

export const UpdateProducts = async ( product: Product, ingredients: Array<Ingredient> ) => {
    const response = await axios.put(`http://localhost:8000/products/${product.id}`, {
        name: product.name,
        price: product.price,
        ingredients: ingredients,
        isCustom: false
    }, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}

export const DeleteProducts = async ( product: Product ) => {
    const response = await axios.delete(`http://localhost:8000/products/${product.id}`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}