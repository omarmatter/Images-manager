<template>
  <el-upload
      :file-list="input"
      list-type="picture-card"
      :auto-upload="false"
      :on-change="onChange"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
    <el-icon>
      <Plus/>
    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image"/>
  </el-dialog>
</template>


<script>
import {ref, computed, watch} from 'vue'
import {Plus} from '@element-plus/icons-vue'

export default {
  name: "AlbumUploader",
  components: {Plus},
  props: {
    modelValue: {
      default: []
    },
    imageUrls: {
      default: null
    }
  },
  emits: ["update:modelValue", "update:urls"],
  setup(props, context) {

    const input = computed({
      set(newVal) {
        context.emit("update:modelValue", newVal);
      },
      get() {
        return props.modelValue ?? [];
      }
    });


    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)

    const handleRemove = (file, files) => {
      input.value = files;
    }

    const handlePictureCardPreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url;
      dialogVisible.value = true
    }
    const onChange = function (file, files) {
      input.value = files;
    }
    return {
      input,
      onChange,
      dialogImageUrl,
      dialogVisible,
      handlePictureCardPreview,
      handleRemove,
    }
  }
}
</script>

<style scoped>

</style>