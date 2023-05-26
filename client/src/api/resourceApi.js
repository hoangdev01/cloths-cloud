import axiosClient from './axiosClient';
import { url } from './constants';

const resourceApi = {
  getImage: filename => {
    const requestUrl = url + `/resource/avatar/${filename}`;
    return axiosClient.get(requestUrl);
  },
  createUserAvatar: params => {
    const requestUrl = url + `/resource/avatar/`;
    return axiosClient.post(requestUrl, params);
  },
  getServiceImage: filename => {
    const requestUrl = url + `/resource/media/${filename}`;
    return axiosClient.get(requestUrl);
  },
  createServiceImage: params => {
    // const requestUrl = url + `/resource/media/`;
    const requestUrl = url + `/resource/media/`;
    return axiosClient.post(requestUrl, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: id => {
    const requestUrl = url + `/resource/delete/${id}`;
    return axiosClient.delete(requestUrl);
  },
};

export default resourceApi;
