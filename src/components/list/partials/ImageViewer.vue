<template>
  <div class="-image-viewer_list">

    <el-image
      class="image-in-list"
      :src="imageSrc"
      :preview-src-list="[imageSrc]"
      :initial-index="1"
      fit="cover"
    />
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "ImageViewer",
  props: {
    column: Object,
    row: Object,
  },
  computed: {
    slug() {
      return this.column?.key;
    },
    imageSrc() {
      return this.row;
    },
  },
};
</script>

<style>
.-image-viewer_list img.el-image__inner.el-image__preview {
  width: 80px;
  aspect-ratio: 1;
  border-radius: 15px;
}
</style>
