import { create } from "zustand";
import { persist } from "zustand/middleware";

type House = {
  id: string;
  address: string;
  price: number;
};

type Stock = {
  id: string;
  symbol: string;
  quantity: number;
};

type Asset = {
  money: number;
  house: House[];
  stock: Stock[];
};

type AssetStore = {
  asset: Asset;
  // CRUD methods
  addMoney: (amount: number) => void;
  resetMoney: () => void;

  addHouse: (house: Omit<House, "id">) => void;
  updateHouse: (id: string, update: Partial<House>) => void;
  deleteHouse: (id: string) => void;

  addStock: (stock: Omit<Stock, "id">) => void;
  updateStock: (id: string, update: Partial<Stock>) => void;
  deleteStock: (id: string) => void;
};

// Mock initial data
const defaultAsset: Asset = {
  money: 5000,
  house: [
    { id: "h1", address: "123 Street", price: 150000 },
    { id: "h2", address: "456 Avenue", price: 250000 },
  ],
  stock: [
    { id: "s1", symbol: "AAPL", quantity: 10 },
    { id: "s2", symbol: "TSLA", quantity: 5 },
  ],
};

export const useAssetStore = create<AssetStore>()(
  persist(
    (set) => ({
      asset: defaultAsset,

      // money
      addMoney: (amount) =>
        set((state) => ({
          asset: { ...state.asset, money: state.asset.money + amount },
        })),

      resetMoney: () =>
        set((state) => ({
          asset: { ...state.asset, money: 0 },
        })),

      // houses
      addHouse: (house) =>
        set((state) => ({
          asset: {
            ...state.asset,
            house: [
              ...state.asset.house,
              { id: crypto.randomUUID(), ...house },
            ],
          },
        })),

      updateHouse: (id, update) =>
        set((state) => ({
          asset: {
            ...state.asset,
            house: state.asset.house.map((h) =>
              h.id === id ? { ...h, ...update } : h
            ),
          },
        })),

      deleteHouse: (id) =>
        set((state) => ({
          asset: {
            ...state.asset,
            house: state.asset.house.filter((h) => h.id !== id),
          },
        })),

      // stocks
      addStock: (stock) =>
        set((state) => ({
          asset: {
            ...state.asset,
            stock: [
              ...state.asset.stock,
              { id: crypto.randomUUID(), ...stock },
            ],
          },
        })),
      updateStock: (id, update) =>
        set((state) => ({
          asset: {
            ...state.asset,
            stock: state.asset.stock.map((s) =>
              s.id === id ? { ...s, ...update } : s
            ),
          },
        })),
      deleteStock: (id) =>
        set((state) => ({
          asset: {
            ...state.asset,
            stock: state.asset.stock.filter((s) => s.id !== id),
          },
        })),
    }),
    
    {
      name: "asset-storage", // key in localStorage
    }
  )
);
