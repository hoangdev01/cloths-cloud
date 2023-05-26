import axios from 'axios';
import queryString from 'query-string';
import { LOCAL_STORAGE_ACCESS_TOKEN_NAME } from '../contexts/constants';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: `Beare ${localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]}`,
  },
  paramsSerializer: params => queryString.stringify(params),
});

export default axiosClient;
