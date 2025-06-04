<template>
  <div class="columns">
    <FlavorColumn
      v-for="col in columns"
      :key="col.type"
      :title="col.title"
      :label="col.label"
      :image="col.image"
    />
  </div>
</template>

<script setup lang="ts">
import FlavorColumn from "./FlavorColumn.vue";
defineProps<{
  columns: Array<{
    type: string;
    title: string;
    label: string;
    image: string | undefined;
  }>;
}>();
</script>

<style scoped>
.columns {
  display: flex;
  justify-content: center;
  margin-top: 220px;
  padding: 40px;
  gap: 180px;
}
</style>
