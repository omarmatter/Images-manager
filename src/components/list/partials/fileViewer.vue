<template>
  <ImageViewer column="file"
               v-if="data.type === 'image'"

               :row="data.file"/>

  <el-image
      v-if="data.type==='video'"
      class="image-in-list"
      :src="data.thumb"
      :initial-index="1"
      fit="cover"
      @click="openVideo(data.file)"
  />
  <a :href="data.file" target="_blank">
    <img src="/media/svg/files/pdf.svg" v-if="data.type==='pdf'" class="image-in-list" />
  </a>

  <Dialog
      v-model="dialogVisible"
      :row="data.file"
  />
</template>

<script>
import ImageViewer from "@/components/list/partials/ImageViewer";
import videoViewer from "@/components/list/partials/VideoViewer";
import Dialog from "@/components/list/partials/Dialog";
import {ref} from "vue";
export default {
  components: {
    ImageViewer,
    videoViewer,
    Dialog
  },
  name: "fileViewer",
  props: {
    data: Object,
    column: Object
  },
  setup(props, {emit}) {
    const dialogVisible = ref(false);
    const openVideo = (src) => {
      dialogVisible.value = true;
    };
    return {
      dialogVisible,
      openVideo
    };
  }
}


</script>

<style scoped>

</style>