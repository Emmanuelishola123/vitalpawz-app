import axios, { AxiosError, AxiosResponse } from 'axios';
import api from './api';
import { productDataType, productMetaType } from '@/app/types/product.types';

interface ResponseType {
  id: number;
  name: string;
  email: string;
}

interface IApiResult<T> {
  data: T;
  error: AxiosError | null;
}

export interface ProductsType {
  data: productDataType[];
  meta: productMetaType;
}

export const retrieveAllProduct = async (filter = null): Promise<IApiResult<ProductsType>> => {
  try {
    console.log({filter}, `/products?${filter}`)
    const response: AxiosResponse<ProductsType> = await api.get(`/products?${filter}`);
    return { data: response.data, error: null };
    // return { data: response.data, error: null };
  } catch (error) {
    // @ts-ignore
    return { data: null, error };
  }
};
