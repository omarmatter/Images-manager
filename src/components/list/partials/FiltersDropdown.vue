<template>
  <!--begin::Menu 1-->

  <div
    class="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
    data-kt-menu="true"
  >
    <!--begin::Header-->
    <div class="px-7 py-5">
      <div class="fs-5 text-dark fw-bolder">Filter Options</div>
    </div>
    <!--end::Header-->

    <!--begin::Menu separator-->
    <div class="separator border-gray-200"></div>
    <!--end::Menu separator-->
    <!--begin::Form-->
    <div class="px-7 py-5">
      <!--begin::Input group-->

      <!--      <component :is="getInputComponent(computedFilters)" />-->
      <div class="mb-10" v-for="(input, index) in filters">
        <el-form>
          <el-form-item>
           <label>{{input.name}}</label>
            <component
              :is="getInputComponent(input)"
              :key="index"
              v-model="data[input.model]"
              v-bind="input"
            />
          </el-form-item>
        </el-form>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <!--end::Input group-->

      <!--begin::Input group-->
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="d-flex justify-content-end">
        <button
          type="reset"
          class="btn btn-sm btn-white btn-active-light-primary me-2"
          data-kt-menu-dismiss="true"
          @click="onResetBtnClicked"
        >
          Reset
        </button>

        <button
          type="submit"
          class="btn btn-sm btn-primary"
          data-kt-menu-dismiss="true"
          @click="onFilterBtnClicked"
        >
          Apply
        </button>
      </div>
      <!--end::Actions-->
    </div>
    <!--end::Form-->
  </div>
  <!--end::Menu 1-->
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import fields from "@/components/builder/fields";
import router from "@/router";
import { Mutations } from "@/store/enums/StoreEnums";
import { initializeComponents } from "@/core/plugins/keenthemes";
import { useRoute } from "vue-router";
import _ from "lodash";

export default defineComponent({
  name: "FiltersDropdown",
  components: {
    ...fields,
  },
  props: {
    config: {
      default: {
        resource: null,
        actions: [],
        filters: [],
      },
    },
  },
  setup(props) {
    const data = ref({});
    const route = useRoute();
    console.log('filter', props)
    onMounted(() => {
      let query = JSON.parse(JSON.stringify(route.query));
      _.forEach(query, (value, key) => {
        if (!isNaN(parseFloat(value))) data.value[key] = parseFloat(value);
        else data.value[key] = value;
      });

      // _.extend(data.value, route.query);
    });

    const filters = computed(() => {
      return props.config.filters;
    });

    const resourceName = computed(() => {
      return props.config.resource;
    });

    const getInputComponent = (input) => `${input.component ?? "input"}-field`;

    const onFilterBtnClicked = function () {
      router.push({
        query: data.value,
      });
    };

    const onResetBtnClicked = function () {
      data.value = {};
      router.push({ query: {} });
    };

    return {
      getInputComponent,
      onFilterBtnClicked,
      onResetBtnClicked,
      filters,
      resourceName,
      data,
    };
  },
});
</script>
