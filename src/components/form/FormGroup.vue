<template>
  <div :class="`col-md-${cols} fv-row`">
    <label class="fs-6 fw-bold mb-2 w-100">
      <slot name="label" :label="label">
          <span class="form-group-label">
            {{ label }}
          </span>
      </slot>
      <el-radio-group
          v-if="multiLang"
          v-model="locale"
          size="small"
          class="float-end multi-locale-group"
      >
        <el-radio-button
            v-for="locale in languages"
            :label="locale"
        />
      </el-radio-group>
    </label>
    <component :is="model ?`el-form-item`  : `div`" :prop="multiLang ? `${model}.${locale}` : model" :rules="rules">
      <slot :locale="locale"></slot>
    </component>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "FormGroup",
  props: {
    cols: {
      default: 3
    },
    rules: Array,
    model: String,
    multiLang: Boolean,
    label: String,
  },
  setup(props, context) {
    const locale = ref('en');
    const languages = ref(['en', 'ar']);

    return {
      locale,
      languages
    }
  }
}
</script>

<style>
.el-radio-button--small .el-radio-button__inner {
  padding: 5px 15px;
  margin-bottom: 5px;
  font-size: 12px;
  border-radius: 0;
}

.multi-locale-group {
  padding: 0 10px;
}
</style>