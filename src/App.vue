<script setup lang="ts">
import { ref } from 'vue'
import QrReader from './components/QrReader.vue'
import ExitButton from './components/ExitButton.vue'
import FlavorColumns from './components/FlavorColumns.vue'

type Item = { name: string, type: string, flash?: boolean }

const columns = ref([
  { type: 'A', title: 'TYPE A', items: [] as Item[] },
  { type: 'B', title: 'TYPE B', items: [] as Item[] },
  { type: 'C', title: 'TYPE C', items: [] as Item[] }
])

function handleScan(obj: Item) {
  const col = columns.value.find(c => c.type === obj.type)
  if (!col) return
  const exist = col.items.find(i => i.name === obj.name)
  if (exist) {
    exist.flash = true
    setTimeout(() => exist.flash = false, 1000)
    return
  }
  col.items.push({ name: obj.name, type: obj.type })
}

function resetAll() {
  columns.value.forEach(col => col.items.splice(0, col.items.length))
}
</script>

<template>
  <div style="position:relative; min-height:100vh; background:#fcf4f0; color:#4a2b23;">
    <ExitButton @resetAll="resetAll" />
    <h1 style="text-align:center; font-weight:normal; font-size:1.8em; margin-top:30px;">Literary Kitchen</h1>
    <p style="text-align:center; font-size:1em; color:#6a4633; margin-top:5px;">掃描你的文學風味，每一種類型都是一種角色與味覺的交會。</p>
    <QrReader @onScan="handleScan" />
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
