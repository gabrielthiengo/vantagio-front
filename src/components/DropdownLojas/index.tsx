import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { Checkbox } from '../ui/checkbox';
import { useStores } from './useStores';

export const DropdownLojas = () => {
  const { stores, nameStoreSelected, checkedStores, handleCheckboxChange } = useStores();

  return (
    <Select>
      <SelectTrigger className="w-auto border-none focus:border-none">
        <div className="flex items-center gap-2">
          <span>{nameStoreSelected}</span>
          {checkedStores > 1 && (
            <div className="text-xs rounded-lg bg-emerald-100 text-emerald-950 font-semibold flex items-center justify-center p-1">
              +{checkedStores}
            </div>
          )}
        </div>
      </SelectTrigger>
      <SelectContent style={{ zIndex: '99999' }}>
        <SelectGroup>
          <SelectLabel>Aqui estão suas lojas</SelectLabel>
          {stores?.map((store) => {
            return (
              <div
                key={store.id}
                className="gap-2 relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <Checkbox
                  checked={store.isChecked}
                  className="rounded"
                  onClick={() => {
                    handleCheckboxChange(store.id, !store.isChecked);
                  }}
                />
                {store.nome}
              </div>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
