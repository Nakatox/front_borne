import axios from "axios";

export const GetToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return token;
    } else {
        return null;
    }
}

export const CheckConnected = async () => {

    const token = GetToken();
    if (token) {
        const response = await axios.get(`http://localhost:8000/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
