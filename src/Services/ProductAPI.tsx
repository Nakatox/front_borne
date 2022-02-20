import axios from "axios";
import { Ingredient } from "../Interface/Ingredient";
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