// src/services/api.ts

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

import type { FoodOption } from "./api-types";

export async function printCountPickBest(options: {
  a: FoodOption;
  b: FoodOption;
  c: FoodOption;
}): Promise<{ ok: boolean; status: string }> {
  const resp = await fetch(
    `${API_DOMAIN}/text-variants/print/${options.a.id}/${options.b.id}/${options.c.id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!resp.ok) throw new Error(`API error: ${resp.status}`);
  return resp.json();
}
