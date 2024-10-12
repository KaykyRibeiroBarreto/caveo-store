import axios from 'axios';
import { ProductType } from '../types/ProductType';

const API_URL = 'https://fakestoreapi.com/products';


export const fetchProducts = async (page: number = 1): Promise<ProductType[]> => {
  const response = await axios.get(`${API_URL}?limit=10&page=${page}`);
  return response.data;
};

export const fetchProductById = async (id: number): Promise<ProductType> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};