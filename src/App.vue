<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useAppStateStore } from "./store/appState";
import QrReader from "./components/QrReader.vue";
import ExitButton from "./components/ExitButton.vue";
import FlavorColumns from "./components/FlavorColumns.vue";
import { imageToPngPath } from "./components/barcodeMapping";
import type { ColumnData } from "./services/api-types";

const appState = useAppStateStore();
const { selectedMainDish, selectedSideDish, selectedDrinkStyle } =
  storeToRefs(appState);

const columns = computed<ColumnData[]>(() => {
  const cols = [
    {
      type: "A" as "A",
      title: "主食",
      label: selectedMainDish.value ? selectedMainDish.value.label : "尚未掃描",
      image: selectedMainDish.value
        ? imageToPngPath(selectedMainDish.value)
        : undefined,
    },
    {
      type: "B" as "B",
      title: "配餐",
      label: selectedSideDish.value ? selectedSideDish.value.label : "尚未掃描",
      image: selectedSideDish.value
        ? imageToPngPath(selectedSideDish.value)
        : undefined,
    },
    {
      type: "C" as "C",
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

const isIdle = ref(false);
let idleTimer: number | undefined;
const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 分鐘

function resetIdleTimer() {
  isIdle.value = false;
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    isIdle.value = true;
  }, IDLE_TIMEOUT);
}

function setupIdleListeners() {
  const events = ["mousemove", "mousedown", "touchstart", "keydown", "click"];
  events.forEach((evt) => {
    window.addEventListener(evt, resetIdleTimer, true);
  });
}

function removeIdleListeners() {
  const events = ["mousemove", "mousedown", "touchstart", "keydown", "click"];
  events.forEach((evt) => {
    window.removeEventListener(evt, resetIdleTimer, true);
  });
}

onMounted(() => {
  setupIdleListeners();
  resetIdleTimer();
});

onUnmounted(() => {
  removeIdleListeners();
  if (idleTimer) clearTimeout(idleTimer);
});
</script>

<template>
  <div class="app-background">
    <template v-if="isIdle">
      <img
        src="/background.jpg"
        style="width: 100vw; height: 100vh; object-fit: cover; display: block"
      />
    </template>
    <template v-else>
      <ExitButton @reset-all="resetAll" />
      <QrReader @on-scan="handleScan" @on-error="handleQrError" />
      <FlavorColumns :columns="columns" />
    </template>
  </div>
</template>

<style scoped>
.app-background {
  width: 1200px;
  height: 1920px;
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
