<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAppStateStore } from "./store/appState";
import QrReader from "./components/QrReader.vue";
import ExitButton from "./components/ExitButton.vue";
import FlavorColumns from "./components/FlavorColumns.vue";
import SystemAlert from "./components/SystemAlert.vue";

const appState = useAppStateStore();
const { selectedMainDish, selectedSideDish, selectedDrinkStyle, error } =
  storeToRefs(appState);

onMounted(() => {
  appState.fetchOptions();
});

const columns = computed(() => [
  {
    type: "A",
    title: "主食",
    items: selectedMainDish.value
      ? [{ name: selectedMainDish.value.main_dish, flash: false }]
      : [],
  },
  {
    type: "B",
    title: "配餐",
    items: selectedSideDish.value
      ? [{ name: selectedSideDish.value.side_dish, flash: false }]
      : [],
  },
  {
    type: "C",
    title: "飲品",
    items: selectedDrinkStyle.value
      ? [{ name: selectedDrinkStyle.value.drink, flash: false }]
      : [],
  },
]);

function handleScan(obj: { type: string; name: string }) {
  appState.selectByQr(obj.type, obj.name);
}

function resetAll() {
  appState.reset();
}

function closeAlert() {
  appState.setError(null);
}

function handleQrError(msg: string) {
  appState.setError(msg);
}
</script>

<template>
  <div
    class="app-background"
  >
   
    <ExitButton @reset-all="resetAll" />
 
    <QrReader @on-scan="handleScan" @on-error="handleQrError" />
    <FlavorColumns :columns="columns" />


  </div>
</template>

<style scoped>

.app-background {
  width: 100vw;
  height: 100vh;
  background-image: url('/background.jpg'); /* public 資料夾內的圖片用這種寫法 */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
