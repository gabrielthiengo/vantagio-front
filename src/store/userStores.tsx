import { create } from 'zustand';

export type StoresProps = {
  id: number;
  nome: string;
  isChecked?: boolean;
};

type ActionsProps = {
  addStores: (stores: StoresProps[]) => void;
  removeAllStores: () => void;
};

type StoreProps = {
  stores: StoresProps[];
  actions: ActionsProps;
};

export const useUserStores = create<StoreProps>((set) => ({
  stores: [],
  actions: {
    addStores: (storesIn) => set(() => ({ stores: storesIn })),
    removeAllStores: () => set(() => ({ stores: [] })),
  },
}));
