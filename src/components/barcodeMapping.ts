import type { FoodOption } from "../services/api-types";

export const barcodeMapping: Record<string, FoodOption> = {
  // 參數A（主食／文本）
  "000000000017": {
    id: 1,
    type: "A",
    label: "寺尾哲也《子彈是餘生》",
    image: "洋芋片",
  },
  "000000000024": {
    id: 2,
    type: "A",
    label: "張嘉祥《夜官巡場 Iā-Kuan Sûn-Tiûnn》",
    image: "虱目魚粥",
  },
  "000000000031": {
    id: 3,
    type: "A",
    label: "薛西斯《K.I.N.G.：天災對策室》",
    image: "馬鈴薯",
  },
  "000000000048": {
    id: 4,
    type: "A",
    label: "楊双子《臺灣漫遊錄》",
    image: "咖哩飯",
  },
  "000000000055": { id: 5, type: "A", label: "李昂《殺夫》", image: "鴨肉飯" },
  "000000000062": {
    id: 6,
    type: "A",
    label: "黃麗群《海邊的房間》",
    image: "麻油雞湯",
  },
  "000000000079": {
    id: 7,
    type: "A",
    label: "陳千武《獵女犯》",
    image: "爪哇烤雞飯",
  },
  "000000000086": {
    id: 8,
    type: "A",
    label: "呂赫若《呂赫若全集》",
    image: "豬肉乾",
  },
  "000000000093": {
    id: 9,
    type: "A",
    label: "賴和《新編賴和全集》",
    image: "燒肉圓",
  },
  "000000000109": {
    id: 10,
    type: "A",
    label: "謝宜安《必修！臺灣校園鬼故事考》",
    image: "營養麵條",
  },
  "000000000116": {
    id: 11,
    type: "A",
    label: "房慧真《夜遊：解嚴前夕一個國中女生的身體時代記》",
    image: "榴槤糯米飯",
  },
  "000000000123": {
    id: 12,
    type: "A",
    label: "程廷 Apyang Imiq《我長在打開的樹洞》",
    image: "小米粥",
  },
  "000000000130": { id: 13, type: "A", label: "白萩《香頌》", image: "炒米粉" },
  // 參數B（配餐／媒材）
  "1000000000016": { id: 1, type: "B", label: "電影／劇集", image: "爆米花" },
  "1000000000023": { id: 2, type: "B", label: "戲劇", image: "生菜沙拉" },
  "1000000000030": { id: 3, type: "B", label: "電玩", image: "茶葉蛋" },
  "1000000000047": { id: 4, type: "B", label: "虛擬實境", image: "分子料理" },
  "1000000000054": { id: 5, type: "B", label: "音樂概念專輯", image: "三色豆" },
  // 參數C（飲品／改編風格）
  "4710088631398": { id: 1, type: "C", label: "蒙太奇", image: "烏龍茶" },
  "4710088630148": { id: 2, type: "C", label: "懸疑", image: "咖啡" },
  "4710958920201": { id: 3, type: "C", label: "後設", image: "紅茶" },
  "4710018000102": { id: 4, type: "C", label: "黑色喜劇", image: "可樂" },
  "9002490204228": { id: 5, type: "C", label: "歌德", image: "提神飲料" },
  "4710421072420": { id: 6, type: "C", label: "推理", image: "鐵觀音" },
  "4711448480038": { id: 7, type: "C", label: "魂系", image: "抹茶" },
  "4714947000134": { id: 8, type: "C", label: "八點檔", image: "可爾必思" },
};

export function imageToPngPath(option: FoodOption): string | undefined {
  if (option.type === "A") {
    return `/A主食_${option.id}${option.image}.png`;
  }
  if (option.type === "B") {
    return `/B配餐_${option.id}${option.image}.png`;
  }
  // C 類目前無圖
  if (option.type === "C") {
    return option.image;
  }
  return undefined;
}
