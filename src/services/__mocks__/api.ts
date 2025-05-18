// src/services/__mocks__/api.ts

import type {
  MainDishText,
  SideDishMedia,
  DrinkStyle,
  TextVariant,
  PrintJob,
  BarcodeMapping,
  BarcodeMappingCreate
} from '../api-types'

// options.py
export async function getMainDishList(): Promise<MainDishText[]> {
  return [
    {
      id: 1,
      author_name: 'Mock Author',
      work_title: 'Mock Work',
      main_dish: 'Mock Dish',
      publisher: 'Mock Publisher',
      genre: 'Mock Genre',
      description: 'Mock Description'
    }
  ]
}

export async function getSideDishList(): Promise<SideDishMedia[]> {
  return [
    { id: 1, media_type: 'audio', side_dish: 'Mock Side Dish' }
  ]
}

export async function getDrinkStyleList(): Promise<DrinkStyle[]> {
  return [
    { id: 1, style: 'Mock Style', drink: 'Mock Drink' }
  ]
}

// printjob.py
export async function createPrintJob(data: Omit<PrintJob, 'id'>): Promise<PrintJob> {
  return {
    id: 1,
    ...data,
    created_at: new Date().toISOString()
  }
}

export async function getPrinterStatus(): Promise<{ status: string; description: string }> {
  return { status: 'mocked', description: 'Printer is mocked' }
}

export async function directPrint(_text: string): Promise<{ ok: boolean; status: string }> {
  return { ok: true, status: 'mocked' }
}

// textvariant.py
export async function pickBestTextVariant(params: { main_dish_text_id: number, side_dish_media_id: number, drink_style_id: number }): Promise<TextVariant> {
  return {
    id: 1,
    main_dish_text_id: params.main_dish_text_id,
    side_dish_media_id: params.side_dish_media_id,
    drink_style_id: params.drink_style_id,
    content: 'Mock Content',
    variant_index: 0,
    length: 10,
    approved: true,
    created_at: new Date().toISOString(),
    print_count: 0
  }
}

export async function getTextVariant(item_id: number): Promise<TextVariant> {
  return {
    id: item_id,
    main_dish_text_id: 1,
    side_dish_media_id: 1,
    drink_style_id: 1,
    content: 'Mock Content',
    variant_index: 0,
    length: 10,
    approved: true,
    created_at: new Date().toISOString(),
    print_count: 0
  }
}

// barcodemapping.py
export async function getBarcodeMappings(): Promise<BarcodeMapping[]> {
  return [
    {
      id: 1,
      barcode: 'MOCKBARCODE',
      main_dish_text_id: 1,
      side_dish_media_id: 1,
      drink_style_id: 1,
      description: 'Mock Barcode',
      created_at: new Date().toISOString()
    }
  ]
}

export async function createBarcodeMapping(data: BarcodeMappingCreate): Promise<BarcodeMapping> {
  return {
    id: 1,
    ...data,
    created_at: new Date().toISOString()
  }
}

export async function deleteBarcodeMapping(_item_id: number): Promise<{ ok: boolean }> {
  return { ok: true }
}
