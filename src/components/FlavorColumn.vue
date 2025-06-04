<template>
  <div class="column">
    <!-- 尚未掃描 -->
    <div v-if="label === '尚未掃描'" class="empty-section">
      <div class="placeholder">還未掃描</div>
    </div>

    <!-- 有掃描資料 -->
    <div v-if="label" >
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
 margin: 30px auto 0 auto;  /* 上 30px，左右置中，下 0px */
  width: 180px;
  height: auto;
  display: block;
}

.placeholder {

  text-align: center;
  font-weight: bold;
  color: #654627;
  font-size: 40px;
}

.
.column {
 
}
.empty-section {
  margin-top:30px;
  display: flex;
  justify-content: center;  /* 水平置中 */
  width:238.340px;
  align-items: center;      /* 垂直置中 */
  height: 255.11px;            /* 必須有固定高度才看的出來垂直置中效果 */
  text-align: center;

  }

.item {
  margin-top:110px;
  font-size: 20px;
  text-align: center;
}


</style>
