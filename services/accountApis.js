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
      ...data,
      token: undefined,
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
      ...data,
      token: undefined,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

/**
 * Retrieve user delivery address
 *
 * @param {*} token
 * @returns
 */
export const retrieveUserAddresses = async (token) => {
  try {
    const response = await api(token).get(`/address`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

/**
 * Create new user delivery address
 *
 * @param {*} data
 * @returns
 */
export const createNewAddress = async (data) => {
  try {
    const response = await api(data?.token).post(`/address`, {
      ...data,
      token: undefined,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

/**
 * Update existing user delivery address
 *
 * @param {*} data
 * @returns
 */
export const updateExistingAddress = async (data) => {
  try {
    const response = await api(data?.token).patch(`/address/update`, {
      ...data,
      default: false,
      token: undefined,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

/**
 * Delete user delivery address
 *
 * @param {*} data
 * @returns
 */
export const deleteAddress = async (data) => {
  try {
    const response = await api(data?.token).delete(`/address/destroy/${data?.address_id}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
