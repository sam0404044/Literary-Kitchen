<template>
  <div class="columns">
    <FlavorColumn
      v-for="col in columns"
      :key="col.type"
      :title="col.title"
      :items="col.items"
    />
  </div>
</template>

<script setup lang="ts">
import FlavorColumn from "./FlavorColumn.vue";
defineProps<{
  columns: Array<{
    type: string;
    title: string;
    items: Array<{ name: string; flash?: boolean }>;
  }>;
}>();
</script>

<style scoped>
.columns {
  display: flex;
  justify-content: center;
  padding: 30px;
  gap: 20px;
}
</style>
