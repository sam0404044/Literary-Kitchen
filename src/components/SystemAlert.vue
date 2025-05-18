<template>
  <div v-if="show" class="alert" :class="type">
    <span class="icon">⚠️</span>
    <span class="message">{{ message }}</span>
    <button class="close" @click="emit('close')">×</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  show: boolean
  message: string
  type?: 'error' | 'warning' | 'info' | 'success'
}>()

const emit = defineEmits(['close'])
</script>

<style scoped>
.alert {
  display: flex;
  align-items: center;
  background: #fff4e5;
  color: #a84040;
  border: 1.5px solid #e6b07a;
  border-radius: 8px;
  padding: 12px 20px;
  margin: 14px auto;
  max-width: 90vw;
  box-shadow: 0 2px 8px rgba(0,0,0,0.09);
  font-size: 1.08em;
  position: relative;
  z-index: 1002;
}
.alert.error {
  background: #ffeaea;
  color: #a84040;
  border-color: #e88b8b;
}
.alert.warning {
  background: #fffbe6;
  color: #b48e00;
  border-color: #ffe08c;
}
.alert.info {
  background: #eaf6ff;
  color: #2176ae;
  border-color: #90c6ec;
}
.alert.success {
  background: #eaffea;
  color: #3b833b;
  border-color: #88e688;
}
.icon {
  margin-right: 10px;
  font-size: 1.4em;
}
.message {
  flex: 1;
}
.close {
  background: none;
  border: none;
  color: #a84040;
  font-size: 1.2em;
  cursor: pointer;
  margin-left: 12px;
  padding: 0 6px;
}
.close:hover {
  color: #e88b8b;
}
</style>
