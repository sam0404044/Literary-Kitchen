<template>
  <video id="qr-reader"></video>
  <div class="status">{{ status }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { BrowserMultiFormatReader } from "@zxing/browser";
let isCooldown = false;
const emit = defineEmits(["onScan", "onError"]);

const status = ref("等待啟動條碼掃描器...");
let codeReader: BrowserMultiFormatReader | null = null;
let controls: any = null;

onMounted(() => {
  const qrReaderDiv = document.getElementById("qr-reader");
  if (qrReaderDiv) qrReaderDiv.innerHTML = "";
  status.value = "初始化條碼掃描器...";

  codeReader = new BrowserMultiFormatReader();
  BrowserMultiFormatReader.listVideoInputDevices()
    .then((videoInputDevices) => {
      if (videoInputDevices.length === 0) {
        status.value = "找不到攝影機裝置";
        emit("onError", "找不到攝影機裝置");
        return;
      }
      status.value = "條碼掃描器已啟動，請將條碼對準鏡頭";
      codeReader!.decodeFromVideoDevice(
        undefined, // 預設使用第一個攝影機
        "qr-reader",
        (result, err, ctrl) => {
          if (ctrl) controls = ctrl;
          if (result) {
            if (isCooldown) return;
            isCooldown = true;
            setTimeout(() => (isCooldown = false), 5000);
            status.value = `已偵測到條碼：${result.getText()} (${result.getBarcodeFormat()})`;
            const payload = {
              code: result.getText(),
              format: result.getBarcodeFormat(),
            };
            emit("onScan", payload);
          } else if (err && (!err.name || err.name !== "NotFoundException")) {
            status.value = "解析條碼失敗";
            emit("onError", "解析條碼失敗");
          }
        },
      );
    })
    .catch((err: any) => {
      status.value = `初始化失敗: ${err?.message || err}`;
      emit("onError", "初始化條碼掃描器失敗");
    });
});

onBeforeUnmount(() => {
  if (controls && typeof controls.stop === "function") controls.stop();
  status.value = "已停止條碼掃描器";
});
</script>

<style scoped>
#qr-reader {
  width: 684px;
  height: 500px;
  margin: 50px auto 0 auto;
  transform: translateX(-6px);
  display: block;
}

.status {
  text-align: center;
  position: absolute;
  top: 529px;
  left: 407px;

  width: 375px;
  height: 40px;

  color: #ffffff;
  font-size: 2em;
  font-weight: bold;
  background-color: #654627;
  display: flex;
  align-items: center; /* 垂直置中 */
  justify-content: center;
}
#qr-reader video,
#qr-reader canvas {
  margin: 0 !important;
  display: block !important;
  max-width: 100% !important;
}
</style>
