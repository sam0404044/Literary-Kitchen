<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAppStateStore } from "./store/appState";
import QrReader from "./components/QrReader.vue";
import ExitButton from "./components/ExitButton.vue";
import FlavorColumns from "./components/FlavorColumns.vue";
import { imageToPngPath } from "./components/barcodeMapping";

const appState = useAppStateStore();
const { selectedMainDish, selectedSideDish, selectedDrinkStyle } =
  storeToRefs(appState);

const columns = computed(() => {
  const cols = [
    {
      type: "A",
      title: "主食",
      label: selectedMainDish.value ? selectedMainDish.value.label : "尚未掃描",
      image: selectedMainDish.value
        ? imageToPngPath(selectedMainDish.value)
        : undefined,
    },
    {
      type: "B",
      title: "配餐",
      label: selectedSideDish.value ? selectedSideDish.value.label : "尚未掃描",
      image: selectedSideDish.value
        ? imageToPngPath(selectedSideDish.value)
        : undefined,
    },
    {
      type: "C",
      title: "飲品",
      label: selectedDrinkStyle.value
        ? selectedDrinkStyle.value.label
        : "尚未掃描",
      image: selectedDrinkStyle.value
        ? imageToPngPath(selectedDrinkStyle.value)
        : undefined,
    },
  ];
  return cols;
});

function handleScan(payload: { code: string; format: string }) {
  appState.selectByQr(payload.code);
}

function resetAll() {
  appState.reset();
}

function handleQrError(msg: string) {
  appState.setError(msg);
}
</script>

<template>
  <div class="app-background">
    <ExitButton @reset-all="resetAll" />

    <QrReader @on-scan="handleScan" @on-error="handleQrError" />
    <FlavorColumns :columns="columns" />
  </div>
</template>

<style scoped>
.app-background {
  width: 100vw;
  height: 100vh;
  background-image: url("/background.jpg"); /* public 資料夾內的圖片用這種寫法 */
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
