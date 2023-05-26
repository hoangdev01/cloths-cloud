import axiosClient from './axiosClient';
import { url } from './constants';

const billApi = {
  getAll: () => {
    const requestUrl = url + '/bill';
    return axiosClient.get(requestUrl);
  },
  get: id => {
    const requestUrl = url + `/bill/${id}`;
    return axiosClient.get(requestUrl);
  },
  getListBill: () => {
    const requestUrl = url + `/bill/list-bill`;
    return axiosClient.get(requestUrl);
  },
};
export default billApi;
