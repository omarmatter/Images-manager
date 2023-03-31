<template>
  <div class="image-holder-container">
    <el-upload v-if="elementUi" :file-list="files"
               accept=".jpg,.png,.gif,.jpeg,.svg"
               :class="{ hideUpload: (files && files.length > 0 ) || input }"
               action="#" :limit="1" list-type="picture-card" :auto-upload="false"
               :on-change="handleChange"
               :on-remove="handleRemove">
      <template #default>
        <el-icon>
          <Plus/>
        </el-icon>
      </template>
    </el-upload>

    <div v-else class="image-input image-input-outline" data-kt-image-input="true"
         :style="`background-image: url(${computedURL})`">
      <!--begin::Preview existing avatar-->
      <el-image v-if="computedURL"
          class="image-in-list img-thump"
          :src="computedURL"
          :preview-src-list="[computedURL]"
          :initial-index="1"
          fit="cover"
      />

      <div class="image-input-wrapper w-125px h-125px"
           :style="`background-image: url(${computedURL})`"></div>

      <!--end::Preview existing avatar-->

      <!--begin::Label-->
      <label v-if="!disabled"
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
          data-kt-image-input-action="change"
          data-bs-toggle="tooltip"
          title="Change avatar">
        <i class="bi bi-pencil-fill fs-7"></i>

        <!--begin::Inputs-->
        <input type="file" ref="profile" name="profile" @change="handleImageChange($event)"/>
        <input type="hidden" name="avatar_remove"/>
        <!--end::Inputs-->
      </label>
      <!--end::Label-->

      <!--begin::Remove-->
      <span v-if="!disabled"
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
          data-kt-image-input-action="remove"
          data-bs-toggle="tooltip"
          @click="handleImageRemove"
          title="Remove profile image"><i class="bi bi-x fs-2"></i></span>
      <!--end::Remove-->
    </div>

  </div>

</template>

<script>
import {Plus} from "@element-plus/icons-vue";
import {ref, computed, onMounted, watch} from "vue";
import {baseURL} from "@/utils/helper";

export default {
  name: "ImageUpload",
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
    const files = ref([]);

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
          let url = (newVal && typeof newVal === "string") ? newVal : null;
          // let url = (newVal && typeof newVal === "string") ? newVal : (typeof newVal?.file_url === "string" ? newVal?.file_url : null)
          if (url) {
            files.value = [{name: "test.png", url: baseURL(`storage/${url}`)}];
          }
        }, {deep: true, immediate: true});


    const handleChange = (file, list) => {
      input.value = file.raw;
    }

    const handleRemove = (file, fileList) => {
      input.value = null;
      files.value = [];
    }
    const encodedFile = ref(null);

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
      if (!isRemoved.value) return props.previewUrl ? baseURL(`storage/${props.previewUrl}`) : '';
      return null;
    });
    return {
      computedURL,
      handleImageChange,
      handleImageRemove,
      handleChange,
      handleRemove,
      files,
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