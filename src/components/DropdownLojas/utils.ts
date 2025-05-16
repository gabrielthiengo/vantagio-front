import { Loja } from './types';

export async function getStoresByUserId(): Promise<Loja[] | null> {
  const storesArray: Loja[] = [
    {
      id: 1,
      nome: 'FLÔ VESTUÁRIO FEMININO - SHOPPING',
      isSelected: true,
    },
    {
      id: 2,
      nome: 'LOJA ÚNICA',
      isSelected: true,
    },
    {
      id: 3,
      nome: 'MAURA MORENA',
      isSelected: false,
    },
    {
      id: 4,
      nome: 'FLÔ VESTUARIO FEMININO - SEDE',
      isSelected: true,
    },
    {
      id: 5,
      nome: 'FLÔ ECCOMERCE 24',
      isSelected: false,
    },
  ];

  storesArray.map((store) => {
    store.isSelected = true;
  });

  return storesArray;
}
