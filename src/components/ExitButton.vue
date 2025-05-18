<template>
  <button class="exit-button" @click="onExit">×</button>
</template>

<script setup lang="ts">
const onExit = () => {
  if (confirm("是否要放棄本次烹飪？")) {
    // 觸發父元件的重置事件
    emit("resetAll");
  }
}
const emit = defineEmits(["resetAll"]);
</script>

<style scoped>
.exit-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #bb6f51;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.exit-button:hover {
  background-color: #a1543e;
}
</style>
