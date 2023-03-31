<template>
  <el-dialog
      v-model="dialogVisible"

      width="30%"


  >

    <videoViewer v-if="dialogVisible" :row="vedioSrc" />

  </el-dialog>
</template>

<script>
import videoViewer from "@/components/list/partials/VideoViewer";
import {computed} from "vue";

export default {
  props: {
    row: Object,
    modelValue: Boolean,

    close: Boolean
  },

  computed: {
    slug() {
      return this.column?.key;
    },
    vedioSrc() {

      return this.row;
    },


  },
  name: "Dialog",
  components: {
    videoViewer
  },
  emits : ['update:modelValue'],
  setup(props, {emit}) {
    const dialogVisible = computed({
      set(newVal) {
        emit("update:modelValue", newVal);
      },

      get() {
        return props.modelValue;
      },
    });


    return {
      dialogVisible
    }


  }

}
</script>

<style scoped>

</style>