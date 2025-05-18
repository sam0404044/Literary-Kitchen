import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAppStateStore } from "@/store/appState";

// Mock API modules
vi.mock("@/services/api", () => ({
  getMainDishList: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        author_name: "寺尾哲也",
        work_title: "子彈是餘生",
        main_dish: "洋芋片",
        publisher: "聯經",
        genre: "小說",
      },
      {
        id: 2,
        author_name: "張嘉祥",
        work_title: "夜官巡場 Iā-Kuan Sûn-Tiûnn",
        main_dish: "虱目魚粥",
        publisher: "九歌",
        genre: "",
      },
    ]),
  ),
  getSideDishList: vi.fn(() =>
    Promise.resolve([
      { id: 1, media_type: "電影／劇集", side_dish: "爆米花" },
      { id: 2, media_type: "戲劇", side_dish: "生菜沙拉" },
    ]),
  ),
  getDrinkStyleList: vi.fn(() =>
    Promise.resolve([
      { id: 1, style: "蒙太奇", drink: "烏龍茶" },
      { id: 2, style: "懸疑", drink: "咖啡" },
      { id: 3, style: "後設", drink: "紅茶" },
    ]),
  ),
}));

describe("appState store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("state 預設值正確", () => {
    const store = useAppStateStore();
    expect(store.status).toBe("idle");
    expect(store.mainDishOptions).toEqual([]);
    expect(store.selectedMainDish).toBeNull();
    expect(store.autoResetCountdown).toBe(60);
    expect(store.loading).toBe(false);
  });

  it("isReadyToPrint getter", () => {
    const store = useAppStateStore();
    expect(store.isReadyToPrint).toBe(false);
    store.mainDishOptions = [
      {
        id: 1,
        author_name: "寺尾哲也",
        work_title: "子彈是餘生",
        main_dish: "洋芋片",
        publisher: "聯經",
        genre: "小說",
      },
    ];
    store.sideDishOptions = [
      { id: 1, media_type: "電影／劇集", side_dish: "爆米花" },
    ];
    store.drinkStyleOptions = [{ id: 1, style: "蒙太奇", drink: "烏龍茶" }];
    store.selectedMainDish = store.mainDishOptions[0];
    store.selectedSideDish = store.sideDishOptions[0];
    store.selectedDrinkStyle = store.drinkStyleOptions[0];
    expect(store.isReadyToPrint).toBe(true);
  });

  it("selectByQr 可正確選擇主食、配餐、飲品並切換狀態", () => {
    const store = useAppStateStore();
    // 使用 mock fixture 中的資料
    store.mainDishOptions = [
      {
        id: 1,
        author_name: "寺尾哲也",
        work_title: "子彈是餘生",
        main_dish: "洋芋片",
        publisher: "聯經",
        genre: "小說",
      },
      {
        id: 2,
        author_name: "張嘉祥",
        work_title: "夜官巡場 Iā-Kuan Sûn-Tiûnn",
        main_dish: "虱目魚粥",
        publisher: "九歌",
        genre: "",
      },
    ];
    store.sideDishOptions = [
      { id: 1, media_type: "電影／劇集", side_dish: "爆米花" },
      { id: 2, media_type: "戲劇", side_dish: "生菜沙拉" },
    ];
    store.drinkStyleOptions = [
      { id: 1, style: "蒙太奇", drink: "烏龍茶" },
      { id: 2, style: "懸疑", drink: "咖啡" },
      { id: 3, style: "後設", drink: "紅茶" },
    ];
    store.selectByQr("A", "1");
    expect(store.selectedMainDish).toEqual(store.mainDishOptions[0]);
    expect(store.status).toBe("selecting");
    store.selectByQr("B", "1");
    expect(store.selectedSideDish).toEqual(store.sideDishOptions[0]);
    expect(store.status).toBe("selecting");
    store.selectByQr("C", "1");
    expect(store.selectedDrinkStyle).toEqual(store.drinkStyleOptions[0]);
    expect(store.status).toBe("readyToPrint");
  });

  it("selectByQr 選不到時會設 error", () => {
    const store = useAppStateStore();
    store.mainDishOptions = [{ main_dish: "飯" }] as any;
    store.selectByQr("A", "麵");
    expect(store.selectedMainDish).toBeNull();
    expect(store.error).toBe("找不到對應主食");
  });

  it("reset 會重設所有狀態", () => {
    const store = useAppStateStore();
    store.selectedMainDish = { main_dish: "飯" } as any;
    store.status = "readyToPrint";
    store.error = "錯誤";
    store.reset();
    expect(store.status).toBe("idle");
    expect(store.selectedMainDish).toBeNull();
    expect(store.error).toBeNull();
  });

  it("fetchOptions 會正確取得資料並設 loading", async () => {
    const store = useAppStateStore();
    await store.fetchOptions();
    expect(store.mainDishOptions[0].main_dish).toBe("洋芋片");
    expect(store.sideDishOptions[0].side_dish).toBe("爆米花");
    expect(store.drinkStyleOptions[0].drink).toBe("烏龍茶");
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });
});
