import axiosClient from './axiosClient';
import { url } from './constants';

const BillApi = {
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
  create: listCart => {
    const requestUrl = url + `/bill`;
    return axiosClient.post(requestUrl, listCart);
  },
  cancel: billId => {
    const requestUrl = url + `/bill/cancel-bill`;
    return axiosClient.put(requestUrl, billId);
  },
  confirm: billId => {
    const requestUrl = url + `/bill/confirm-bill`;
    return axiosClient.put(requestUrl, billId);
  },
};
export default BillApi;
