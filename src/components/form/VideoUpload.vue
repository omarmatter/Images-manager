<template>
  <div class="image-holder-container">

    <el-upload

        class="upload-demo"
        :on-change="handleChange"
        :auto-upload="false"
        :limit="1"
        :on-remove="handleRemove"

    >
      <el-button type="primary">Click to upload</el-button>

    </el-upload>
<div class="w-50">
  <video v-if="file" :src="file"   controls key="`file${file}`" class="w-50 " ></video>

</div>

  </div>

</template>

<script>
import {Plus} from "@element-plus/icons-vue";
import {ref, computed, onMounted, watch} from "vue";

export default {
  name: "VideoUpload",
  components: {
    Plus
  },
  props: {
    disabled : Boolean,
    elementUi: {
      type: Boolean,
      default: true
    },
    modelValue: {
      default: null
    },
    previewUrl: {
      default: null,
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const file = ref(null);

    const input = computed({
      set(newVal) {
        context.emit("update:modelValue", newVal);
      },
      get() {
        return props.modelValue;
      }
    });


    watch(() => props.previewUrl,
        (newVal) => {
          console.log('newVal',newVal)
          if ( typeof newVal ==="object" && newVal?.url) {
           file.value = newVal.url
          }else if ( typeof newVal === "object" && newVal?.uid) {
            file.value = URL.createObjectURL(newVal)
          }
          else {
            file.value = null
          }
        //  let url = (newVal && typeof newVal === "string") ? newVal : null;

          // let url = (newVal && typeof newVal === "string") ? newVal : (typeof newVal?.file_url === "string" ? newVal?.file_url : null)

        }, {deep: true, immediate: true});





    const handleChange = (file, list) => {
      console.log('file',file)
      input.value = file.raw;
    }

    const handleRemove = (file, fileList) => {
      input.value = null;

    }

    const handleImageChange = function (e) {
      var image = e.target.files || e.dataTransfer.files;
      var file = e.target.files[0];
      if (!image.length)
        return;
      var reader = new FileReader();
      reader.readAsDataURL(image[0])
      reader.onload = event => {
        file.url = event.target?.result;
        encodedFile.value = event.target?.result;
        input.value = file;
      }
    }

    const handleImageRemove = function () {
      encodedFile.value = null;
      input.value = null;
      isRemoved.value = true;
    }

    const isRemoved = ref(false);

    const computedURL = computed(() => {
      if (encodedFile.value) return encodedFile.value;
      console.log("files", files.value);
      if (!isRemoved.value) return props.previewUrl ? props.previewUrl : '';
      return null;
    });
    return {
      computedURL,
      handleImageChange,
      handleImageRemove,
      handleChange,
      handleRemove,
      file,
      input
    }
  }
}
</script>

<style scoped>
.image-input.image-input-outline {
  background-color: #dfdfdf26;
}
.img-thump {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>