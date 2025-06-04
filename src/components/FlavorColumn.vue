<template>
  <div class="column">
    <!-- 尚未掃描 -->
    <div v-if="label === '尚未掃描'" class="empty-section">
      <div class="placeholder">尚未掃描</div>
    </div>

    <!-- 有掃描資料 -->
    <div v-if="label">
      <img
        v-if="image"
        :src="image"
        alt="尚未掃描圖片"
        class="placeholder-image"
      />
      <div :key="label" class="item">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  image?: string;
  title?: string;
}>();
</script>

<style scoped>
.placeholder-image {
  width: 180px;
  height: auto;
  margin: 0 auto 10px;
  display: block;
}

.placeholder {
  text-align: center;
  margin-top: 85px;
  font-weight: bold;
  color: #654627;
  font-size: 40px;
}

.empty-section {
  text-align: center;
  padding: 10px;
}
</style>
