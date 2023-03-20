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

export const retrieveAllProduct = async (pageNo = null): Promise<IApiResult<ProductsType>> => {
  try {
    const response: AxiosResponse<ProductsType> = await api.get(`/products?page=${pageNo}`);
    return { data: response.data, error: null };
    // return { data: response.data, error: null };
  } catch (error) {
    // @ts-ignore
    return { data: null, error };
  }
};
