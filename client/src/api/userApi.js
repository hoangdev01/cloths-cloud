import axiosClient from './axiosClient';
import { url } from './constants';

const userApi = {
  getAll: params => {
    const requestUrl = url + `/user`;
    return axiosClient.get(requestUrl, { params });
  },
  get: id => {
    const requestUrl = url + `/user/${id}`;
    return axiosClient.get(requestUrl, id);
  },
  getUserList: id => {
    const requestUrl = url + `/user/get-basic-user`;
    return axiosClient.get(requestUrl);
  },
  getUser: id => {
    const requestUrl = url + `/user/get-user`;
    return axiosClient.get(requestUrl);
  },
  getEmployeeList: id => {
    const requestUrl = url + `/user/get-employee`;
    return axiosClient.get(requestUrl);
  },

  updateUser: params => {
    const requestUrl = url + `/user/`;
    return axiosClient.put(requestUrl, params);
  },

  UserToEmployee: params => {
    const requestUrl = url + `/user/to-employee`;
    return axiosClient.put(requestUrl, params);
  },
  EmployeeToUser: params => {
    const requestUrl = url + `/user/to-user`;
    return axiosClient.put(requestUrl, params);
  },
  activeUser: params => {
    const requestUrl = url + `/user/active-user`;
    return axiosClient.put(requestUrl, params);
  },
};

export default userApi;
