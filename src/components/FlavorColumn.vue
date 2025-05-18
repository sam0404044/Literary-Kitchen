<template>
  <div class="column">
    <h3>{{ title }}</h3>
    <div v-if="items.length === 0" class="placeholder">尚未掃描</div>
    <div v-for="item in items" :key="item.name" class="item" :class="{flash: item.flash}">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{
  title: string
  items: Array<{ name: string, flash?: boolean }>
}>()
</script>

<style scoped>
.column {
  flex: 1;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff1ec;
  border: 2px solid #d9a88c;
  min-height: 250px;
  max-width: 100%;
  width: 30vw;
  position: relative;
}
.column h3 {
  text-align: center;
  border-bottom: 2px dashed #bb6f51;
  margin-bottom: 15px;
  padding-bottom: 5px;
  font-size: 1.2em;
  color: #8b3f2c;
}
.item {
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  background-color: #fce2d4;
  border: 1px solid #d99977;
  font-weight: bold;
  text-align: center;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.05);
}
.item.flash {
  animation: flash 3s ease-in-out;
}
.placeholder {
  text-align: center;
  color: #b79a8a;
  font-style: italic;
}
@keyframes flash {
  0% { background-color: #a84040; }
  50% { background-color: #b33838; }
  100% { background-color: #b66756; }
}
</style>
