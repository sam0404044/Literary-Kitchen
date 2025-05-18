import { defineStore } from 'pinia'
import type {
  MainDishText,
  SideDishMedia,
  DrinkStyle,
  TextVariant,
  PrintJob,
  BarcodeMapping
} from '../services/api-types'

export type AppStateStatus =
  | 'idle'
  | 'selecting'
  | 'readyToPrint'
  | 'printing'
  | 'printed'

export interface AppState {
  status: AppStateStatus
  mainDishOptions: MainDishText[]
  sideDishOptions: SideDishMedia[]
  drinkStyleOptions: DrinkStyle[]
  selectedMainDish: MainDishText | null
  selectedSideDish: SideDishMedia | null
  selectedDrinkStyle: DrinkStyle | null
  textVariant: TextVariant | null
  printJob: PrintJob | null
  printerStatus: { status: string; description: string } | null
  scannedBarcode: string | null
  barcodeMapping: BarcodeMapping | null
  barcodeMappings?: BarcodeMapping[]
  autoResetCountdown: number
  loading: boolean
  error: string | null
}

export const useAppStateStore = defineStore('appState', {
  state: (): AppState => ({
    status: 'idle',
    mainDishOptions: [],
    sideDishOptions: [],
    drinkStyleOptions: [],
    selectedMainDish: null,
    selectedSideDish: null,
    selectedDrinkStyle: null,
    textVariant: null,
    printJob: null,
    printerStatus: null,
    scannedBarcode: null,
    barcodeMapping: null,
    barcodeMappings: [],
    autoResetCountdown: 60,
    loading: false,
    error: null
  }),
  getters: {
    isReadyToPrint(state): boolean {
      return (
        !!state.selectedMainDish &&
        !!state.selectedSideDish &&
        !!state.selectedDrinkStyle
      )
    }
  },
  actions: {
    async fetchOptions() {
      this.loading = true
      try {
        const [main, side, drink] = await Promise.all([
          (await import('../services/api')).getMainDishList(),
          (await import('../services/api')).getSideDishList(),
          (await import('../services/api')).getDrinkStyleList()
        ])
        this.mainDishOptions = main
        this.sideDishOptions = side
        this.drinkStyleOptions = drink
        this.error = null
      } catch (e) {
        this.error = '取得選項失敗'
      } finally {
        this.loading = false
      }
    },
    selectByQr(type: string, value: string) {
      this.error = null
      if (type === 'A') {
        const found = this.mainDishOptions.find((opt: MainDishText) => opt.main_dish === value)
        if (found) {
          this.selectedMainDish = found
        } else {
          this.error = '找不到對應主食'
        }
      } else if (type === 'B') {
        const found = this.sideDishOptions.find((opt: SideDishMedia) => opt.side_dish === value)
        if (found) {
          this.selectedSideDish = found
        } else {
          this.error = '找不到對應配餐'
        }
      } else if (type === 'C') {
        const found = this.drinkStyleOptions.find((opt: DrinkStyle) => opt.drink === value)
        if (found) {
          this.selectedDrinkStyle = found
        } else {
          this.error = '找不到對應飲品'
        }
      }
      // 狀態切換
      if (this.selectedMainDish && this.selectedSideDish && this.selectedDrinkStyle) {
        this.status = 'readyToPrint'
      } else {
        this.status = 'selecting'
      }
    },
    reset() {
      this.status = 'idle'
      this.selectedMainDish = null
      this.selectedSideDish = null
      this.selectedDrinkStyle = null
      this.textVariant = null
      this.printJob = null
      this.printerStatus = null
      this.scannedBarcode = null
      this.barcodeMapping = null
      this.autoResetCountdown = 60
      this.loading = false
      this.error = null
    },
    setStatus(status: AppStateStatus) {
      this.status = status
    },
    setMainDish(mainDish: MainDishText | null) {
      this.selectedMainDish = mainDish
    },
    setSideDish(sideDish: SideDishMedia | null) {
      this.selectedSideDish = sideDish
    },
    setDrinkStyle(drinkStyle: DrinkStyle | null) {
      this.selectedDrinkStyle = drinkStyle
    },
    setTextVariant(tv: TextVariant | null) {
      this.textVariant = tv
    },
    setPrintJob(job: PrintJob | null) {
      this.printJob = job
    },
    setPrinterStatus(status: { status: string; description: string } | null) {
      this.printerStatus = status
    },
    setScannedBarcode(barcode: string | null) {
      this.scannedBarcode = barcode
    },
    setBarcodeMapping(mapping: BarcodeMapping | null) {
      this.barcodeMapping = mapping
    },
    setBarcodeMappings(mappings: BarcodeMapping[]) {
      this.barcodeMappings = mappings
    },
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setError(error: string | null) {
      this.error = error
    },
    setAutoResetCountdown(count: number) {
      this.autoResetCountdown = count
    }
  }
})
