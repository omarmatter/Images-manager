<template>
  <div >

    <video autoplay  controls  class="w-100 h-100" >

      <source
        :src="vedioSrc"
          type="video/mp4"
      />
    </video>


  </div>
</template>

<script>
import _ from "lodash";
import {watch} from "vue";

export default {
  name: "VideoViewer",
  props: {
    column: Object,
    row: Object,
    close:Boolean
  },

  computed: {
    slug() {
      return this.column?.key;
    },
    vedioSrc() {

      return this.row;
    },



  }
};

</script>

<style>
.el-overlay {
  background-color: rgb(0 0 0 / 26%) !important;

}
</style>
