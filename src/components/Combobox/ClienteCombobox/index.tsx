import { CheckIcon, ChevronsUpDownIcon, LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useListarClienteCombobox } from './useListarClienteCombobox';

type ClienteComboboxProps = {
  handleClienteSelected: (clienteId: number) => void;
  isClearSelectedValue: boolean;
};

export function ClienteCombobox({ handleClienteSelected, isClearSelectedValue }: ClienteComboboxProps) {
  const { open, value, isFetching, clientes, inputValue, setValue, setInputValue, setOpen } =
    useListarClienteCombobox(isClearSelectedValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[100%] justify-between font-normal">
          {value ? value : 'Selecione um cliente...'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput
            value={inputValue}
            placeholder="Pesquisar cliente..."
            onValueChange={(value) => setInputValue(value)}
          />
          <CommandList>
            {!isFetching && <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>}
            {!isFetching ? (
              <CommandGroup>
                {clientes.map((cliente) => (
                  <CommandItem
                    key={cliente.id}
                    value={cliente.pessoa?.nome ?? ''}
                    onSelect={(currentValue) => {
                      setValue(currentValue);

                      handleClienteSelected(cliente.id);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn('mr-2 h-4 w-4', value === cliente.pessoa?.nome ? 'opacity-100' : 'opacity-0')}
                    />
                    {cliente.pessoa?.nome}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandGroup>
                <div className="flex flex-row items-center justify-center gap-1 p-2 text-sm text-gray-500">
                  <LoaderCircle className="animate-spin" size={14} />
                  Buscando clientes...
                </div>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
