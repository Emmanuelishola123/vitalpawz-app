import { AxiosError, AxiosResponse } from 'axios';
import api from './api';

interface IApiResult<T> {
  data: T;
  error: AxiosError | null;
}

interface applyPropsType {
  code: string;
  products: { id: string; quantity: number; options?: string[] }[];
}

/**
 * Apply coupon code alongside list of products to get discount
 */
export const applyCouponToProduct = async (data: applyPropsType): Promise<IApiResult<any>> => {
  try {
    const response: AxiosResponse<any> = await api.post(`/cart/apply/coupon`, {
      ...data,
    });
    console.log({ response });
    return { data: response.data, error: null };
  } catch (error) {
    // @ts-ignore
    return { data: null, error };
  }
};


/**
 * 
 */
export const placeOrder = async (data) : Promise<IApiResult<any>> => {
  try {
    console.log({...data})
    const response: AxiosResponse<any> = await api.post(`/orders/pay`, {
      ...data,
    });
    console.log({ response });
    return { data: response.data, error: null };
  } catch (error) {
    // @ts-ignore
    return { data: null, error };
  }
}
