import { useEffect, useState } from 'react';
import { StoresProps, useUserStores } from '@/store/userStores';
import { useAuth } from '@/context/AuthProvider/useAuth';

export const useStores = () => {
  const [checkedStores, setCheckedStores] = useState(0);
  const [nameStoreSelected, setNameStoreSelected] = useState('Selecione uma ou mais lojas');
  const { stores: data } = useAuth();
  const {
    stores,
    actions: { addStores, removeAllStores },
  } = useUserStores();

  useEffect(() => {
    if (stores.length === 0) {
      if (data) {
        addStores(data);
      }
    }

    if (stores.length > 0) {
      setNameStoreSelected(stores[0].nome);
      handleUpdateStores(stores);
    }
  }, [stores, data]);

  const handleUpdateStores = (updatedStores: StoresProps[]) => {
    const storesChecked = updatedStores.filter((store) => store.isChecked);

    setCheckedStores(storesChecked.length);
    if (storesChecked.length > 0) {
      setNameStoreSelected(storesChecked[0].nome);
    } else {
      setNameStoreSelected('Selecione uma ou mais lojas');
    }
  };

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (stores) {
      const updatedStores = stores.map((store) => (store.id === id ? { ...store, isChecked: isChecked } : store));

      removeAllStores();
      addStores(updatedStores);
      handleUpdateStores(updatedStores);
    }
  };

  return {
    stores,
    nameStoreSelected,
    checkedStores,
    handleCheckboxChange,
  };
};
