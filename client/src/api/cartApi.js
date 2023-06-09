import axiosClient from './axiosClient';
import { url } from './constants';

const CartApi = {
  getAll: () => {
    const requestUrl = url + '/user/cart';
    return axiosClient.get(requestUrl);
  },

  addCart: service => {
    const requestUrl = url + '/user/cart';
    return axiosClient.post(requestUrl, service);
  },

  deleteCart: serviceId => {
    return axiosClient.delete(url + `/user/cart/${serviceId}`);
  },
};

export default CartApi;
