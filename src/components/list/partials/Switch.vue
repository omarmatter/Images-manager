<template>
  <SwitchField
    :loading="loading"
    @update:modelValue="onSwitchChange"
    v-model="model"
  />
</template>
<!--:key="`switch_${resource}_${row.id}`"-->

<script>
import SwitchField from "@/components/builder/fields/SwitchField";
import { computed, ref, watch } from "vue";
import ApiAxiosService from "@/core/services/ApiService";
import { notify } from "@/utils/notify";
import EndPoint from "@/core/services/EndPoint";

export default {
  name: "Switch",
  components: { SwitchField },
  props: {
    column: Object,
    row: Object,
    resource: String,
  },
  emits: ["reload-table"],
  setup(props, { emit }) {
    const loading = ref(false);
    const model = ref(0);
    const row = computed(() => props.row);

    const value = computed({
      set(newVal) {
        model.value = newVal;
      },
      get() {
        return row.value[props.column.key];
      },
    });

    model.value = value.value;

    let endPoint = EndPoint.resolveEndPoint(
      `${props.resource}.update`,
      props.row.id
    );
    if (props.column.endPoint?.name)
      endPoint = EndPoint.resolveEndPoint(
        props.column.endPoint?.name,
        props.row.id,
        props.column.endPoint?.params
      );

    const onSwitchChange = function (currentValue) {
      loading.value = true;
      let params = {
        _method: "PUT",
      };
      params[props.column.key] = currentValue;
      ApiAxiosService.request(endPoint, params)
        .then(({ data }) => {
          const { message, payload } = data;
          notify.success(message);
          emit("reload-table");
          loading.value = false;
        })
        .catch((err) => {
          notify.success(err?.data?.message);
          loading.value = false;
        });
    };
    return {
      onSwitchChange,
      loading,
      model,
    };
  },
};
</script>
