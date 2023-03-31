import ApiAxiosService from "@/core/services/ApiAxiosService";
import {handleError} from "@/core/helpers/response";
import {APIs} from "@/store/enums/ApiEnums";


export const getCities = async (country_id) => {
    try {
        let response = await ApiAxiosService.get(APIs.COUNTRY.cities(country_id) ,{});
        return response.data.data.cities;
    }catch (e) {
        handleError(e)
    }
}
