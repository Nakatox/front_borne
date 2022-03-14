import axios from "axios";
import { Ingredient } from "../Interface/Ingredient";
import { Order } from "../Interface/Order";
import { Product } from "../Interface/Product";
import { GetToken } from "./CheckConnected";

export const CreateOrder = async (products: Array<Array<String>>, totPrice: number, userEmail: String): Promise<Order> => {
    const response = await axios.post(`http://localhost:8000/orders`, {
        products,
        totPrice,
        userEmail
    }, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;

}

export const GetOrders = async (): Promise<Array<Order>> => {
    const response = await axios.get(`http://localhost:8000/orders`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}

export const DoneOrder = async (orderId: number) => {
    const response = await axios.get(`http://localhost:8000/orders/${orderId}` ,{
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}

export const GetOrderHasProduct = async (productId: number): Promise<Array<Order>> => {
    const response = await axios.get(`http://localhost:8000/orderHasProduct/${productId}`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });

    return response.data.data;
}