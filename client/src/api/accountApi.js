import axiosClient from "./axiosClient";
import { url } from "./constants";

const AccountApi = {
    getUser: () => {
        const requestUrl = url + "/user/get-user";
        return axiosClient.get(requestUrl);
    }
}

export default AccountApi;