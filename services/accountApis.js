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


/**
 * Update User Account Password
 * 
 * @param {*} data 
 * @returns 
 */
export const updatePassword = async (data) => {
  try {
    const response = await api(data?.token).patch(`/auth/password`, {
      ...data, token: undefined,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
