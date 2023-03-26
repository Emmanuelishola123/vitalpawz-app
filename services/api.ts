import axios, { AxiosInstance } from 'axios';

const BASEURL = process.env.NEXT_PUBLIC_API_URL;

const api = (token: string = ''): AxiosInstance =>
  axios.create({
    baseURL: BASEURL,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

export default api;
