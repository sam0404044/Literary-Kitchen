// src/services/interface.ts

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
