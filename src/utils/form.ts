export const toFormData = function (
    model,
    form = new FormData(),
    namespace = "",
    is_edit = false
) {
    const formData = form || new FormData();
    for (const propertyName in model) {
        if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue;
        const formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
        if (model[propertyName] instanceof Date)
            formData.append(formKey, model[propertyName].toISOString());
        else if (model[propertyName] instanceof Array) {
            model[propertyName].forEach((element, index) => {
                if (typeof element !== "object") {
                    formData.append(`${formKey}[${index}]`, model[propertyName][index]);
                }
                const tempFormKey = `${formKey}[${index}]`;
                toFormData(element, formData, tempFormKey);
            });
        } else if (
            typeof model[propertyName] === "object" &&
            !(model[propertyName] instanceof File)
        )
            toFormData(model[propertyName], formData, formKey);
        else if (model[propertyName] instanceof File)
            formData.append(formKey, model[propertyName]);
        else formData.append(formKey, model[propertyName].toString());
    }
    if (is_edit) formData.append("_method", "PUT");
    return formData;
};

