import axios from '../services/axios';

const PRODUCTS_ENDPOINT = 'products/';


export const fetchProducts = async () => {  // Removed body
    const { data } = await axios.get(PRODUCTS_ENDPOINT);
    return data;
};



