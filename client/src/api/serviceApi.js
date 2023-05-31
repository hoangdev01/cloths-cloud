import axiosClient from './axiosClient';
import { url } from './constants';

const serviceAPI = {
  getAll: params => {
    const requestUrl = url + '/service';
    return axiosClient.get(requestUrl, { params });
  },
  getService: slug => {
    const requestUrl = url + `/service/${slug}`;
    return axiosClient.get(requestUrl);
  },
  get: id => {
    const requestUrl = url + `/service/${id}`;
    return axiosClient.get(requestUrl);
  },
  getServiceList: service_code => {
    const requestUrl = url + `/service/get-service-list/${service_code}`;
    return axiosClient.get(requestUrl);
  },
  getListServiceInstance: id => {
    const requestUrl = url + `/service/${id}/instance`;
    return axiosClient.get(requestUrl);
  },
  createServiceInstance: (id, params) => {
    const requestUrl = url + `/service/${id}/instance`;
    return axiosClient.post(requestUrl, params);
  },
  updateServiceInstance: (id, credentials) => {
    const requestUrl = url + `/service/${id}/instance`;
    return axiosClient.put(requestUrl, credentials);
  },
  deleteServiceInstance: id => {
    const requestUrl = url + `/service/${id}/instance`;
    return axiosClient.delete(requestUrl);
  },
  create: params => {
    const requestUrl = url + `/service/`;
    return axiosClient.post(requestUrl, params);
  },
  update: credentials => {
    const requestUrl = url + `/service/`;
    return axiosClient.put(requestUrl, credentials);
  },
  delete: id => {
    const requestUrl = url + `/service/${id}`;
    return axiosClient.delete(requestUrl);
  },
};

export default serviceAPI;
