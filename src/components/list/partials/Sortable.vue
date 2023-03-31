<template>
  <div class="draggable">
    <!--    <transition-group name="list" tag="div">-->
    <!--    v-model="items"-->
    <!--    @end="onEnd"-->
    <draggable v-model="items" @end="onEnd" itemKey="id">
      <template #item="{ element, index }">
        <div
          class="flex-table-item"
          :class="{ active: activeIndex === element.id }"
          @click="selectItem(element, index)"
        >
          <slot
            name="item"
            :element="element"
            :index="index"
            :label="element.name"
          >
            {{ element.name }}
          </slot>
        </div>
      </template>
    </draggable>
    <!--    </transition-group>-->
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import Draggable from "vuedraggable";

export default {
  name: "Sortable",
  emits: ["updated", "select", "update:modelValue"],
  components: {
    Draggable,
  },
  props: {
    loading: Boolean,
    resource: String,
    rows: {
      default: [],
    },
    modelValue: {
      default: [],
    },
  },
  setup(props, { emit }) {
    const items = computed({
      set(newVal) {
        emit("update:modelValue", newVal);
      },
      get() {
        return props.modelValue ?? [];
      },
    });

    const activeItem = ref(null);

    const activeIndex = computed(() => {
      return activeItem.value?.id;
    });

    const selectItem = function (item, index) {
      activeItem.value = item;
      emit("select", item, index);
    };

    const onEnd = function ($event) {
      emit("updated", props.resource, items.value, $event);
    };

    return {
      items,
      onEnd,
      selectItem,
      activeItem,
      activeIndex,
    };
  },
};
</script>

<style scoped></style>
