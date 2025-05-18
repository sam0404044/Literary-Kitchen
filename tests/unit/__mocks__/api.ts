// __mocks__/api.ts
export const getMainDishList = vi.fn(() => Promise.resolve([]));
export const getSideDishList = vi.fn(() => Promise.resolve([]));
export const getDrinkStyleList = vi.fn(() => Promise.resolve([]));
export const createPrintJob = vi.fn(() => Promise.resolve({}));
export const getPrinterStatus = vi.fn(() =>
  Promise.resolve({ status: "ok", description: "" }),
);
export const directPrint = vi.fn(() =>
  Promise.resolve({ ok: true, status: "ok" }),
);
export const pickBestTextVariant = vi.fn(() => Promise.resolve({}));
export const getTextVariant = vi.fn(() => Promise.resolve({}));
export const getBarcodeMappings = vi.fn(() => Promise.resolve([]));
export const createBarcodeMapping = vi.fn(() => Promise.resolve({}));
export const deleteBarcodeMapping = vi.fn(() => Promise.resolve({ ok: true }));
