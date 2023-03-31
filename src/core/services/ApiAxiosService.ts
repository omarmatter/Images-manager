import axios from "axios";
import JwtService from "@/core/services/JwtService";
import {API_END_POINT} from "@/store/enums/ApiEnums";

class ApiAxiosService {

    public static init() {
        axios.defaults.baseURL = API_END_POINT;
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        this.setHeader();
    }


    public static setHeader() {
        axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${JwtService.getToken()}`;
        axios.defaults.headers.common["Accept"] =
            "application/json";

        return axios;
    }

    public static get(url, params = {}) {
        this.setHeader();
        console.log(params)
        return axios.get(url, {params: params});
    }

    public static post(url, data, header = {}) {
        this.setHeader();
        return axios.post(url, data, {
            headers: header
        });
    }

    public static put(url, data) {
        this.setHeader();
        return axios.put(url, data);
    }

    public static delete(url) {
        this.setHeader();
        return axios.delete(url);
    }
}

export default ApiAxiosService;
