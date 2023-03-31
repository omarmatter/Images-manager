<template>
  <div class=" card container mt-5">
    <div class=" card-body pt-0">
      <Datatable
          class="table-button-actions-width"
          :total="total"
          :rowsPerPage="perPage"
          :loading="loading"
          :table-data="tableData"
          :table-header="tableHeader"
          :checked-All="checkedAll"
          @check-all-change="setCheckAll"
          :enable-items-per-page-dropdown="false"


          @current-change="onCurrentChange"

      >
        <template v-slot:cell-checkbox="{ row: data }">
          <div
              class="form-check form-check-sm form-check-custom form-check-solid"
          >
            <input
                class="form-check-input"
                type="checkbox"
                :value="data.id"
                v-model="checked"
            />
          </div>
        </template>
        <template v-slot:cell-id="{ row: data }">
          {{ data.id }}
        </template>
        <template v-slot:cell-name="{ row: data }">
          <!-- name folder with Document icon -->
          <i class="fas fa-folder"
              style="color: #0d6efd; font-size: 2.5rem; margin-right: 10px;"
          ></i>

          {{ data.name }}
        </template>



        <template v-slot:cell-actions="{ row: data }">

          <el-button type="primary" title="Manage" size="small" :icon="CopyDocument" circle></el-button>
          <el-button type="info" title="Manage" size="small" :icon="Edit" circle></el-button>


          <!--        <el-button type="primary"  title="Manage" size="small" :icon="Setting" @click="manageSection(data.id)" circle></el-button>-->


        </template>

      </Datatable>

    </div>
  </div>

</template>

<script>
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import {defineComponent, onMounted, ref, watch} from "vue";
import {Delete, Edit, Search, View, Setting, CopyDocument} from '@element-plus/icons-vue'
import {copyText} from 'vue3-clipboard'
import fileViewer from "@/components/list/partials/fileViewer";

import VuePdfEmbed from 'vue-pdf-embed'
import router from "../../../router";
import {setCurrentPageBreadcrumbs} from "../../../core/helpers/breadcrumb";

export default {
  name: "Table",
  components: {
    Datatable,
    VuePdfEmbed,
    fileViewer,
  },
  setup() {

    const tableHeader = ref([
      {
        key: "checkbox",
        sortable: false,

      },

      {

        name: "ID",
        key: "id",
        sortable: false,
      },

      {
        name: "Name",
        key: "name",
        sortable: false,
      },



      {
        name: "Actions",
        key: "actions",
        sortable: false,
      },
    ]);

    const tableData = ref([]);
    tableData.value = [
      {
        'id': 1,
        'name': 'test',
        'file': 'https://picsum.photos/200/300',
        "type": 'image',
        'is_active': 1,


      },
      {
        'id': 2,
        'name': 'test2',
        'file': 'https://picsum.photos/200/300',
        'is_active': 1,
        "type": 'image',
      },
      {
        'id': 3,
        'name': 'test3',
        'file': 'https://picsum.photos/200/300',
        'is_active': 1,
        "type": 'image'
      },
      {
        'id': 4,
        'name': 'test4',
        'file': 'https://picsum.photos/200/300',
        'is_active': 1,
        "type": 'image'
      },
      {
        'id': 5,
        'name': 'test5',
        'file': 'https://picsum.photos/200/300',
        'is_active': 1,
        "type": 'image'
      },
      {
        "id": 7,
        "name": "test6",
        "type":'pdf',
        "file": "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf",

      },
      {
        "id": 6,
        "name": "test6",
        "file": "https://golfsaudi.com/storage/2022-10-18/Ey94PNIuDT8RKMlyNyYgmAz7BZX0RuBR1jQtNDof.mp4",
        "is_active": 1,
        "type": "video",
        "thumb": "https://i.ytimg.com/vi/7e90gBu4pas/hqdefault.jpg"
      },

    ]
    const total = ref(0);
    const loading = ref(false);
    const dialogVisible = ref(false)
    const currentPage = ref(1);
    const perPage = ref(0);
    const filters = ref({
      status: '',
      page: 1
    })

    onMounted(() => {
      setCurrentPageBreadcrumbs('Folders', [], 'create-folder')
    })
    const checked = ref([]);
    const checkedAll = ref(false);
    const closeVideo = ref(false)

    const setCheckAll = (value) => {
      checkedAll.value = value;
      if (value) checked.value = tableData.value.map(function (item) {
        return item['id']
      });
      else checked.value = [];
    }
    const Copy = (id) => {

      copyText(id, undefined, (error, event) => {

        if (error) {
          console.log(error)
        } else {
          console.log(event)
        }
      })

    }

    const openVideo = (url) => {
      dialogVisible.value = true
    }
    const handleClose = (done) => {
      dialogVisible.value = false
      closeVideo.value = true

      done()
    }
    const Create = () => {
      router.push({name: 'Create.media'})
    }
    return {
      tableHeader,
      tableData,
      total,
      currentPage,
      perPage,
      filters,
      loading,
      checked,
      checkedAll,
      setCheckAll,
      Delete,
      Edit,
      Search,
      CopyDocument,
      Copy,
      openVideo,
      dialogVisible,
      handleClose,
      closeVideo,
      View,
      Setting,
      Create
    }

  }
}
</script>

<style scoped>
.el-overlay {
  background-color: rgb(0 0 0 / 26%) !important;

}
</style>