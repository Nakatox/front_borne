import axios from 'axios';
import { Auth } from '../Interface/Auth';

export const AuthApi = async (name: string, password: string): Promise<Auth> => {

    const response = await axios.post(`http://localhost:8000/auth`, {
        name,
        password
    });
    return response.data;

}