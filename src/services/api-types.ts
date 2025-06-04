// src/services/interface.ts

export interface FoodOption {
  id: number;
  type: "A" | "B" | "C";
  label: string;
  image: string;
}

export interface ColumnData {
  type: "A" | "B" | "C";
  title: string;
  label: string;
  image: string | undefined;
}
