import axiosClient from './axiosClient';
import { url } from './constants';

const notificationApi = {
  getAll: params => {
    const requestUrl = url + `/notification`;
    return axiosClient.get(requestUrl, { params });
  },
  get: id => {
    const requestUrl = url + `/notification/${id}`;
    return axiosClient.get(requestUrl, id);
  },
  update: id => {
    const requestUrl = url + `/notification/${id}`;
    return axiosClient.put(requestUrl);
  },
};

export default notificationApi;
