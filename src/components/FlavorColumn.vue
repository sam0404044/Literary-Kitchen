<template>
  <div class="column">
    <!-- 尚未掃描 -->
    <div v-if="items.length === 0" class="empty-section">
      <img src="/A主食_1洋芋片.png" alt="尚未掃描圖片" class="placeholder-image" />
      <div class="placeholder">尚未掃描</div>
    </div>

    <!-- 有掃描資料 -->
    <div
      v-for="item in items"
      :key="item.name"
      class="item"
      :class="{ flash: item.flash }"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});
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
  margin-top:85px;
  font-weight: bold;
  color: #654627;
  font-size:40px
}

.empty-section {
  text-align: center;
  padding: 10px;
}
</style>
