import axiosClient from './axiosClient'
import {url} from './constants'

const eventApi = {
    getAll: (params) => {
        const requestUrl = url + `/event`;
        return axiosClient.get(requestUrl, { params });
    },
    get: (id) => {
        const requestUrl = url + `/event/${id}`;
        return axiosClient.get(requestUrl, id);
    },
    createEvent: params => {
        const requestUrl = url + `/event`;
        return axiosClient.post(requestUrl, params);
    },
    updateEvent: params => {
        const requestUrl = url + `/event`;
        return axiosClient.put(requestUrl, params);
    },
    deleteEvent: id => {
        const requestUrl = url + `/event/${id}`;
        return axiosClient.delete(requestUrl);
    },
}

export default eventApi;