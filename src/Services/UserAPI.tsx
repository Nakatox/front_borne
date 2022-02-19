import axios from "axios";
import { User } from "../Interface/User";
import { GetToken } from "./CheckConnected";

export const GetUsers = async (role: String): Promise<Array<User>> => {
    const response = await axios.get(`http://localhost:8000/users/`,{ 
        params: { role },
        headers: {
            Authorization: `Bearer ${GetToken()}`
        } 
    });
    return response.data;
}

export const GetCurrentUser = async (): Promise<User> => {
    const response = await axios.get(`http://localhost:8000/users/me`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });
    return response.data.data;
}