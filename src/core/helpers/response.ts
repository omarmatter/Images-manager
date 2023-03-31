
import router from "@/router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { ElNotification } from 'element-plus'
import store from "@/store";
import {Mutations} from "@/store/enums/StoreEnums";

export const handleError = (error , type = 'notification') => {
    if(error.response.status == 401) {
        store.commit(Mutations.PURGE_AUTH);
        router.push({name : 'sign-in'});
    }else {
        switch (type) {
            case 'notification' :
                ElNotification({
                    title: 'Error',
                    message: error.response.data.message,
                    type: 'error',
                    position : 'top-right'
                })
                break;

            case 'swal' :
                Swal.fire({
                    text: error.response.data.message,
                    icon: "error",
                });
                break;
        }
    }
};
export const handleSuccess = (response , type = 'notification') => {
    switch (type) {
        case 'notification' :
            ElNotification({
                title: 'Success',
                message: response.data.message,
                type: 'success',
                position : 'top-right'
            })
            break;

        case 'swal' :
            Swal.fire({
                text: response.data.message,
                icon: "success",
            });
            break;
    }
};
