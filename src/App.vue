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
</script>

<template>
  <div
    style="
      position: relative;
      min-height: 100vh;
      background: #fcf4f0;
      color: #4a2b23;
    "
  >
    <SystemAlert
      v-if="error"
      :show="!!error"
      :message="error || ''"
      type="error"
      @close="closeAlert"
    />
    <ExitButton @reset-all="resetAll" />
    <h1
      style="
        text-align: center;
        font-weight: normal;
        font-size: 1.8em;
        margin-top: 30px;
      "
    >
      Literary Kitchen
    </h1>
    <p
      style="
        text-align: center;
        font-size: 1em;
        color: #6a4633;
        margin-top: 5px;
      "
    >
      掃描你的文學風味，每一種類型都是一種角色與味覺的交會。
    </p>
    <QrReader @on-scan="handleScan" />
    <FlavorColumns :columns="columns" />
  </div>
</template>

<style scoped>
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
