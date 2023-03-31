<template>
  <span
    class="badge fs-7 fw-bolder"
    :class="`badge-light-${getStatus.class}`"
    >{{ getStatus.label }}</span
  >
</template>

<script>
export default {
  name: "BadgeList",
  props: {
    column: Object,
    row: Object,
  },
  computed: {
    slug() {
      return this.column?.key;
    },
    getStatus() {
      return _.get(this.row, this.slug);
    },
  },
};
</script>

<style scoped></style>
