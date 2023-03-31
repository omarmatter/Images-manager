<template>
  <div>
    <GDialog
      v-model="isVisible"
      transition="custom-from-bottom-transition"
      fullscreen
    >
      <!--      :key="`component_${isVisible}`"-->

      <component
        v-if="component && isVisible"
        :is="component"
        @cancel="onCancel"
        @submit-success="onSubmitSuccess"
        v-bind="data"
      />
    </GDialog>
  </div>
</template>

<script>
import { GDialog } from "gitart-vue-dialog";
import "gitart-vue-dialog/dist/style.css";
import { computed } from "vue";

export default {
  name: "ListDialog",
  components: {
    GDialog,
  },
  props: {
    component: {
      default: null,
    },
    data: {
      default: {},
    },
    modelValue: {
      default: false,
    },
  },
  emits: ["update:modelValue", "cancel", "submit-success"],
  setup(props, { emit }) {
    const isVisible = computed({
      set(newVal) {
        emit("update:modelValue", newVal);
      },

      get() {
        return props.modelValue;
      },
    });

    const onSubmitSuccess = function (...args) {
      emit("submit-success", ...args);
    };
    const onCancel = function (...args) {
      emit("cancel", ...args);
    };

    return {
      onSubmitSuccess,
      onCancel,
      isVisible,
    };
  },
};
</script>

<style lang="scss">
.custom-rotate-transition {
  &-enter-from {
    transform: translate(0, 30px) rotate(20deg);
    opacity: 0;
  }

  &-leave-to {
    transform: translate(0, 30px) rotate(10deg);
    opacity: 0;
  }
}

.custom-from-bottom-transition {
  &-enter-from {
    transform: translate(0, 100%);
    opacity: 0;
  }

  &-leave-to {
    transform: translate(0, -30%);
    opacity: 0;
  }
}
</style>
