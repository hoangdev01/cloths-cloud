import axiosClient from './axiosClient';
import { url } from './constants';

const tagApi = {
  getListTag: params => {
    const requestUrl = url + `/tag`;
    return axiosClient.get(requestUrl, { params });
  },
  create: params => {
    const requestUrl = url + `/tag/`;
    return axiosClient.post(requestUrl, params);
  },
  update: params => {
    const requestUrl = url + `/tag/`;
    return axiosClient.put(requestUrl, params);
  },
  delete: id => {
    const requestUrl = url + `/tag/${id}`;
    return axiosClient.delete(requestUrl);
  },
};

export default tagApi;
