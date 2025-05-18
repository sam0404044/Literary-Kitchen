<template>
  <div id="qr-reader"></div>
</template>

<script setup lang="ts">
import { onMounted, defineEmits } from 'vue'
let scanner: any = null
let isCooldown = false
const emit = defineEmits(["onScan"])

onMounted(() => {
  // @ts-ignore
  import('html5-qrcode').then(({ Html5QrcodeScanner }) => {
    scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 })
    scanner.render((decodedText: string) => {
      if (isCooldown) return
      isCooldown = true
      setTimeout(() => isCooldown = false, 5000)
      try {
        const obj = JSON.parse(decodedText)
        if (!obj.type || !obj.name) return
        emit("onScan", obj)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("解析 QRCode 錯誤：", e)
      }
    }, () => {})
  })
})
</script>

<style scoped>
#qr-reader {
  width: 60vw;
  max-width: 600px;
  margin: 30px auto;
}
</style>
