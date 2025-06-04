<template>
  <div class="columns">
    <FlavorColumn
      v-for="col in columns"
      :key="col.type"
      :type="col.type"
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
    type: "A" | "B" | "C";
    title: string;
    label: string;
    image: string | undefined;
  }>;
}>();
</script>

<style scoped>
.columns {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 790px;
  left: 56px;
  display: flex;
  justify-content: center; /* ✅ 水平置中整組物件 */
  gap: 62px; /* ✅ 物件間固定距離，不靠在一起 */
  width: 1088px;
  height: 463px;
}
</style>
