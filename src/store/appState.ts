import { defineStore } from "pinia";
import type { FoodOption } from "../services/api-types";
import { barcodeMapping } from "../components/barcodeMapping";
import { printCountPickBest } from "../services/api";

export type AppStateStatus =
  | "idle"
  | "selecting"
  | "readyToPrint"
  | "printing"
  | "printed";

export interface AppState {
  status: AppStateStatus;
  selectedMainDish: FoodOption | null;
  selectedSideDish: FoodOption | null;
  selectedDrinkStyle: FoodOption | null;
  scannedBarcode: string | null;
  autoResetCountdown: number;
  loading: boolean;
  error: string | null;
}

export const useAppStateStore = defineStore("appState", {
  state: (): AppState => ({
    status: "idle",
    selectedMainDish: null,
    selectedSideDish: null,
    selectedDrinkStyle: null,
    scannedBarcode: null,
    autoResetCountdown: 60,
    loading: false,
    error: null,
  }),
  getters: {
    isReadyToPrint(state): boolean {
      return (
        !!state.selectedMainDish &&
        !!state.selectedSideDish &&
        !!state.selectedDrinkStyle
      );
    },
  },
  actions: {
    selectByQr(value: string) {
      this.error = null;
      const option = barcodeMapping[value];
      if (!option) {
        this.error = `無效條碼：${value}`;
        return;
      }
      if (option.type === "A") {
        this.selectedMainDish = option;
        this.error = "主食已選擇";
      } else if (option.type === "B") {
        this.selectedSideDish = option;
        this.error = "配餐已選擇";
      } else if (option.type === "C") {
        this.selectedDrinkStyle = option;
        this.error = "飲品已選擇";
      } else {
        this.error = `未知類型條碼：${value}`;
        return;
      }
      if (
        this.selectedMainDish &&
        this.selectedSideDish &&
        this.selectedDrinkStyle
      ) {
        this.status = "readyToPrint";
        this.print({
          a: this.selectedMainDish,
          b: this.selectedSideDish,
          c: this.selectedDrinkStyle,
        });
      } else {
        this.status = "selecting";
      }
    },
    print(options: { a: FoodOption; b: FoodOption; c: FoodOption }) {
      printCountPickBest(options).then((res) => {
        if (res.ok) {
          this.status = "printed";
        } else {
          this.error = "列印失敗";
        }
      });
    },
    reset() {
      this.status = "idle";
      this.selectedMainDish = null;
      this.selectedSideDish = null;
      this.selectedDrinkStyle = null;
      this.scannedBarcode = null;
      this.autoResetCountdown = 60;
      this.loading = false;
      this.error = null;
    },
    setStatus(status: AppStateStatus) {
      this.status = status;
    },
    setMainDish(mainDish: FoodOption | null) {
      this.selectedMainDish = mainDish;
    },
    setSideDish(sideDish: FoodOption | null) {
      this.selectedSideDish = sideDish;
    },
    setDrinkStyle(drinkStyle: FoodOption | null) {
      this.selectedDrinkStyle = drinkStyle;
    },
    setScannedBarcode(barcode: string | null) {
      this.scannedBarcode = barcode;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setError(error: string | null) {
      this.error = error;
    },
    setAutoResetCountdown(count: number) {
      this.autoResetCountdown = count;
    },
  },
});
