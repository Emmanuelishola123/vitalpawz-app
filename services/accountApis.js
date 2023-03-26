import axios, { AxiosError, AxiosResponse } from 'axios';
import api from './api';


/**
 * Update User Account Data
 * 
 * @param {*} data 
 * @returns 
 */
export const updateAccount = async (data) => {
  try {
    const response = await api(data?.token).patch(`/auth/edit`, {
      ...data, token: undefined,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
