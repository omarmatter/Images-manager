<template>
  <div :class="{ 'card full-width': !sortable }">
    <div :class="{ 'card-body pt-0': !sortable }">
      <div class="datatables-container" v-if="!sortable">
        <Datatable
          class="table-button-actions-width"
          :total="total"
          :page="currentPage"
          :rowsPerPage="perPage"
          :loading="loading"
          :table-data="rows"
          :table-header="computedColumns"
          :enable-items-per-page-dropdown="true"
          @current-change="onCurrentChange"
          @items-per-page-change="changePerPage"
        >
          <template
            v-for="column in list.columns"
            v-slot:[`cell-${column.key}`]="{ row: data }"
          >
            <component
              v-if="column.component"
              :is="column.component"
              :column="column"
              :row="data"
              @reload-table="reloadTable"
            />
            <span v-else> {{ $get(data, column.key) }} </span>
          </template>

          <template v-slot:cell-actions="{ row: data }">
            <el-row class="actions">
              <span v-for="action in list.actions">
                <router-link v-if="action.route" :to="{ name: action.route, params: { id: data.id }}">
                  <el-button
                    :type="action.type ?? 'default'"
                    size="small"
                    :icon="action.icon"
                    circle
                  ></el-button>
                </router-link>
                <el-button
                  v-else
                  @click="onActionClicked(data, action, $event)"
                  :type="action.type ?? 'default'"
                  size="small"
                  :icon="action.icon"
                  circle
                ></el-button>
              </span>
            </el-row>
          </template>
        </Datatable>
      </div>
      <div class="sortable-container" v-loading="loading" v-else>
        <Sortable :resource="resource" v-model="rows" @updated="onSorting">
          <template #item="{ element }">
            <div class="card mb-5 mb-xl-8">
              <div class="card-body pb-0">
                <div class="d-flex align-items-center mb-5">
                  <div class="d-flex align-items-center flex-grow-1">
                    <div
                      v-for="column in columns"
                      class="d-flex flex-column p-5"
                      :style="{ width: `${100 / columns.length + 1}%` }"
                    >
                      <component
                        v-if="column.component"
                        :is="column.component"
                        :column="column"
                        :row="element"
                        @reload-table="reloadTable"
                      />
                      <span
                        v-else
                        class="text-gray-800 text-hover-primary fs-6 fw-bolder"
                      >
                        {{ $get(element, column.key) }}
                      </span>
                    </div>

                    <div
                      class="my-0"
                      :style="{ width: `${100 / columns.length + 1}%` }"
                    >
                      <el-button
                        class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                        v-for="action in actions"
                        @click="onActionClicked(element, action, $event)"
                        :type="action.type ?? 'default'"
                        size="small"
                        :icon="action.icon"
                        circle
                      ></el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Sortable>
        <el-empty
          v-if="!loading && rows.length <= 0"
          description="No Results Found"
        />
      </div>
      <ListDialog
        v-model="isDialogVisible"
        :component="dialog?.component"
        :data="dialog?.data"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  onMounted,
  ref,
  watch,
} from "vue";
import ApiAxiosService from "@/core/services/ApiService";
import { Delete, Edit, Search, View } from "@element-plus/icons-vue";
import router from "@/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";
import EndPoint from "@/core/services/EndPoint";
import components from "@/components/list/partials";
import { notify } from "@/utils/notify";
import { useRoute } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "Index",
  props: {
    resource: String,
    list: {
      default: [],
    },
    form: {
      default: {},
    },
    actions: {
      default: [],
    },

    sortable: {
      default: false,
      type: Boolean,
    },
  },
  components,
  setup(props) {
    const isDialogVisible = ref(false);
    console.log("route", props.list.actions);
    onMounted(() => {
      setCurrentPageBreadcrumbs(`Show All ${props.resource}`, [
        props.resource.toUpperCase(),
      ]);
    });
    const computedColumns = ref([
      ...props.list.columns,
      {
        name: "Actions",
        key: "actions",
        route: "",
        component: "actions",
      },
    ]);
    const route = useRoute();
    const loading = ref(true);
    const rows = ref([]);
    const total = ref(0);
    const currentPage = ref(1);
    const perPage = ref(10);
    const paginator = ref({
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 1,
      total: 0,
    });
    const fetchEndPoint = computed(() =>
      EndPoint.resolveEndPoint(`${props.resource}.index`, filters.value)
    );

    const filters = ref({
      search: "",
      status: "",
      type: "",
      page: 1,
      per_page: 10,
    });

    const query = computed(() => {
      return { ...filters.value, ...route.query };
    });

    const fetch = function () {
      loading.value = true;
      // filters.page = currentPage.value;

      ApiAxiosService.request(fetchEndPoint.value, { params: query.value })
        .then(({ data }) => {
          const { payload, paginator } = data;

          loading.value = false;
          rows.value = payload;
          console.log("ApiAxiosService", rows.value);
          total.value = paginator.total;

          // paginator.value = Object.assign({}, data.paginator);
          // alert(total.value);

          // total.value = data.paginator.total;
          // currentPage.value = paginator.current_page
          // total.value = data.paginator.total;
          // console.log("onResponse success", rows.value, paginator.value);
        })
        .catch(() => {
          // console.log("onResponse error", rows.value, paginator.value);
          // rows.value = [{ name: "WeSSaM", country_name: "Palestine" }];
          loading.value = false;
        });
    };

    const onCurrentChange = (value) => {
      filters.value.page = value;
    };

    const changePerPage = (value) => {
      filters.value.per_page = value;
      filters.value.page = 1;
    };

    watch(
      query,
      (currentValue, oldValue) => {
        fetch();
      },
      {
        deep: true,
        immediate: true,
      }
    );

    const reloadTable = function () {
      fetch();
    };

    const editResource = function (item) {
      router.push({ name: `${props.resource}.edit`, params: { id: item.id } });
    };

    const deleteRow = function (row) {
      loading.value = true;
      ApiAxiosService.request(
        EndPoint.resolveEndPoint(`${props.resource}.destroy`, row.id)
      )
        .then(({ data }) => {
          const { message } = data;
          notify.success(message);
          fetch();
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const dialog = ref({
      component: null,
      data: {},
    });

    const onActionClicked = function (row, action, $event) {
      switch (action.key) {
        case "edit":
          router.push({
            name: `${props.resource}.edit`,
            params: { id: row.id },
          });
          break;
        case "delete":
          Swal.fire({
            title: "Delete",
            text: "Are you sure from delete ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.value) deleteRow(row);
          });
          break;
        case "show":
          isDialogVisible.value = true;
          dialog.value = {
            component: defineAsyncComponent(() =>
              import("@/views/resource/Show.vue")
            ),
            data: {
              resource: props.resource,
              row,
              form: props.form,
            },
          };
          break;
      }
    };

    const onSorting = function (resource) {
      ApiAxiosService.request(
        EndPoint.resolveEndPoint(`${resource}.ordering`),
        { items: rows.value }
      ).then(({ payload }) => {
        reloadTable();
      });
    };

    return {
      onSorting,
      reloadTable,
      isDialogVisible,
      dialog,
      onActionClicked,
      computedColumns,
      editResource,
      fetch,
      paginator,
      rows,
      loading,
      total,
      perPage,
      onCurrentChange,
      changePerPage,
      filters,
      currentPage,

      Search,
      Edit,
      Delete,
      View,
    };
  },
});
</script>

<style lang="css">
.el-row.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
