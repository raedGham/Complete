import axios from 'axios';

export const UserCart = async (cart, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/cart`, { cart }, { headers: { authToken } })
}