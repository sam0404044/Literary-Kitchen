<template>
  <div class="column">
    <div class="card-image">
      <template v-if="type === 'C'">
        <div class="drink-style-label">{{ image }}</div>
      </template>
      <template v-else>
        <template v-if="image">
          <img :src="image" alt="尚未掃描圖片" />
        </template>
        <template v-else>
          <div class="placeholder"></div>
        </template>
      </template>
    </div>
    <div class="card-label">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  image?: string;
  type: "A" | "B" | "C";
  title?: string;
}>();
</script>

<style scoped>
.column {
  width: 316px;
  height: 463px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 314px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.card-image img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  display: block;
}

.placeholder {
  text-align: center;
  font-weight: bold;
  color: #654627;
  font-size: 32px;
}

.drink-style-label {
  font-size: 2.5rem;
  color: #654627;
  font-weight: bold;
  text-align: center;
  width: 100%;
}

.card-label {
  width: 100%;
  height: 106px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  word-wrap: normal;
  font-size: 2rem;
  font-weight: bold;
  color: #654627;
}
</style>
