<template>
  <a href="#" class="text-gray-800 text-hover-primary fs-6 fw-bolder">{{
    row.name
  }}</a>
  <span class="text-gray-400 fw-bold">{{ row.description }}</span>
</template>

<script>
export default {
  name: "Brieftext",
  props: {
    row: {
      default: {},
    },
    column: {
      default: {},
    },
  },
};
</script>

<style scoped></style>
