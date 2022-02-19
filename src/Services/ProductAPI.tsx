import axios from "axios";
import { GetToken } from "./CheckConnected";

export const GetProducts = async () => {
    const response = await axios.get(`http://localhost:8000/products`, {
        params: {
            isCustom: false
        },
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data;
}