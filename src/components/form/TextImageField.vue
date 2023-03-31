<template>
  <el-row :class="classes">
    <div class="col-md-12 fv-row">
      <label class="fs-6 fw-bold mb-8">
        {{ label }}
      </label>
    </div>
    <div class="col-md-6 fv-row">
      <label class="required fs-6 fw-bold mb-2">Image</label>
      <el-form-item>
        <ImageUpload
            :element-ui="false"
            v-model="input.image"
            :preview-url="input?.image?.file_url"
        />
      </el-form-item>
    </div>
    <div class="col-md-6 fv-row">
      <div class="col-md-12 fv-row" v-for="language in ['en' , 'ar']">
        <label class="required fs-6 fw-bold mb-2">
          Message text ({{ language.toUpperCase() }})
        </label>
        <el-form-item>
          <el-input v-model="input.text[language]"
                    :rows="4"
                    type="textarea"
                    :placeholder="`Message text`"
          />
        </el-form-item>
      </div>
    </div>
  </el-row>

</template>

<script>
import ImageUpload from "@/components/form/ImageUpload.vue";
import FormGroup from "@/components/form/FormGroup.vue";
import {computed, ref} from "vue";

export default {
  name: "TextImageField",
  components: {
    ImageUpload,
    // FormGroup
  },
  props: {
    modelValue: {
      type: Object,
      default: {text: {}}
    },
    label: String,
    classes: {
      default: ""
    },
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    const input = computed({
      set(newValue) {
        emit("update:modelValue", newValue);
      },
      get() {
        return props.modelValue ?? {text: {}};
      }
    });


    const rules = ref({
      required: [
        {
          required: true,
          message: "This field is required",
          trigger: "change",
        },
      ],
    });

    return {
      input,
      rules
    }
  }
}
</script>

<style scoped>

</style>