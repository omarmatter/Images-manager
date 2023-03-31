import {useRoute} from "vue-router";
import {computed, onBeforeMount, ref} from "vue";
import {toFormData} from "@/utils/form";
import ApiAxiosService from "@/core/services/ApiAxiosService";
import {APIs} from "@/store/enums/ApiEnums";
import {handleError, handleSuccess} from "@/core/helpers/response";
import Swal from "sweetalert2/dist/sweetalert2.js";

export const useForm = function (
    props,
    context,
    formTemplate = {},
    rulesTemplate = null,
    callbacks = {
        afterFetch: null,
        onSuccessSubmit: null,
        parseToForm: null
    },
    resourceEndPoints
) {

    const route = useRoute();
    const languages = ref(['en', 'ar']);

    const resourceId = computed(() => route.params?.id);
    const isUpdate = computed(() => !!resourceId.value);
    const isReadOnly = computed(() => (route.name ?? "").includes("show"));
    const formRef = ref(null);

    const form = ref(formTemplate ?? {});
    const rules = ref(rulesTemplate ?? {
        required: [
            {
                required: true,
                message: "This field is required",
                trigger: "change",
            },
        ],
    });
    // const resourceEndPoints = APIs.ON_BOARDING_SCREEN;
    const isSubmitLoading = ref(false);
    const isFindLoading = ref(false);
    const resourceObjectKey = computed(() => "resource");

    const findResource = function () {
        isFindLoading.value = true;
        const url = isUpdate.value ? resourceEndPoints.edit(resourceId.value) : resourceEndPoints.create;
        ApiAxiosService.get(url, {}).then(({data}) => {
            isFindLoading.value = false;
            // form.value = Object.assign({}, data.data?.[resourceObjectKey.value] ?? formTemplate);
            form.value = data.data?.[resourceObjectKey.value] ?? formTemplate;
            if (callbacks.afterFetch instanceof Function) callbacks.afterFetch(data);
        }).catch(() => {
            isFindLoading.value = false;
        })
    }

    const initForm = function () {
        findResource();
        // if (isUpdate.value) findResource();
    }


    onBeforeMount(() => {
        initForm();
    });

    const submitEndPoint = computed(() => {
        if (!isUpdate.value) return resourceEndPoints.store;
        else if (resourceEndPoints.update instanceof Function) return resourceEndPoints.update(resourceId.value);
        throw new Error("There's No EndPoint");
    });

    const handleSubmit = function () {
        isSubmitLoading.value = true;
        let convertedForm = new FormData();
        if (callbacks.parseToForm instanceof Function)
            convertedForm = callbacks.parseToForm(form.value, isUpdate.value, toFormData);
        else convertedForm = toFormData(form.value, null, null, isUpdate.value);
        // if (callbacks.parseToForm instanceof Function) convertedForm = callbacks.parseToForm(convertedForm);
        ApiAxiosService.post(submitEndPoint.value, convertedForm).then(function (response) {
            isSubmitLoading.value = false;
            handleSuccess(response);
            if (callbacks.onSuccessSubmit instanceof Function) callbacks.onSuccessSubmit(response.data);
        }).catch(function (err) {
            isSubmitLoading.value = false;
            handleError(err);
        });
    }

    const submit = function () {
        formRef.value.validate((valid) => {
            if (valid)
                handleSubmit();
            else
                Swal.fire({
                    text: "Sorry, looks like there are some errors detected, please try again.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                });
        });
    }


    return {
        initForm,
        submit,
        languages,
        resourceId,
        isUpdate,
        isReadOnly,
        formRef,
        form,
        rules,
        resourceEndPoints,
        isSubmitLoading,
        isFindLoading,
        resourceObjectKey,

    }

}