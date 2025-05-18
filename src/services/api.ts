// src/services/api.ts

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN

// Data Types
export interface MainDishText {
  id: number;
  author_name: string;
  work_title: string;
  main_dish: string;
  publisher: string;
  genre: string;
  description?: string;
}

export interface SideDishMedia {
  id: number;
  media_type: string;
  side_dish: string;
}

export interface DrinkStyle {
  id: number;
  style: string;
  drink: string;
}

export interface TextVariant {
  id: number;
  main_dish_text_id: number;
  side_dish_media_id: number;
  drink_style_id: number;
  content: string;
  variant_index: number;
  length: number;
  approved: boolean;
  created_at: string;
  print_count: number;
}

export interface PrintJob {
  id?: number;
  text_variant_id: number;
  status: string;
  created_at: string;
}

export interface BarcodeMapping {
  id: number;
  barcode: string;
  main_dish_text_id?: number;
  side_dish_media_id?: number;
  drink_style_id?: number;
  description?: string;
  created_at: string;
}

export interface BarcodeMappingCreate {
  barcode: string;
  main_dish_text_id?: number;
  side_dish_media_id?: number;
  drink_style_id?: number;
  description?: string;
}

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN

// options.py
export async function getMainDishList(): Promise<MainDishText[]> {
  const resp = await fetch(`${API_DOMAIN}/maindish`)
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}

export async function getSideDishList(): Promise<SideDishMedia[]> {
  const resp = await fetch(`${API_DOMAIN}/sidedish`)
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}

export async function getDrinkStyleList(): Promise<DrinkStyle[]> {
  const resp = await fetch(`${API_DOMAIN}/drinkstyle`)
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}

// printjob.py
export async function createPrintJob(data: Omit<PrintJob, 'id'>): Promise<PrintJob> {
  const resp = await fetch(`${API_DOMAIN}/print-jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}

export async function getPrinterStatus(): Promise<{ status: string; description: string }> {
  const resp = await fetch(`${API_DOMAIN}/printer-status`)
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}

export async function directPrint(text: string): Promise<{ ok: boolean; status: string }> {
  const resp = await fetch(`${API_DOMAIN}/printer-direct-print`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}

// textvariant.py
export async function pickBestTextVariant(params: { main_dish_text_id: number, side_dish_media_id: number, drink_style_id: number }): Promise<TextVariant> {
  const q = new URLSearchParams(params as any).toString()
  const resp = await fetch(`${API_DOMAIN}/pick-best?${q}`)
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}

export async function getTextVariant(item_id: number): Promise<TextVariant> {
  const resp = await fetch(`${API_DOMAIN}/${item_id}`)
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}

// barcodemapping.py
export async function getBarcodeMappings(): Promise<BarcodeMapping[]> {
  const resp = await fetch(`${API_DOMAIN}/barcodemapping/`)
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}

export async function createBarcodeMapping(data: BarcodeMappingCreate): Promise<BarcodeMapping> {
  const resp = await fetch(`${API_DOMAIN}/barcodemapping/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}

export async function deleteBarcodeMapping(item_id: number): Promise<{ ok: boolean }> {
  const resp = await fetch(`${API_DOMAIN}/barcodemapping/${item_id}`, {
    method: 'DELETE'
  })
  if (!resp.ok) throw new Error(`API error: ${resp.status}`)
  return resp.json()
}
