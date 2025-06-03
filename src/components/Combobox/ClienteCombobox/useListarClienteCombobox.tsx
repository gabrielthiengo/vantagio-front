import ListarClientes, { ClientesList } from '@/services/cliente/ListarClientes';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useListarClienteCombobox = (isClearSelectedValue: boolean) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [clientes, setClientes] = useState<ClientesList[]>([]);
  const [nomeCliente, setNomeCliente] = useState<string | null>(null);

  const listarClientes = () => {
    setIsFetching(true);

    ListarClientes.listar({
      page: 1,
      nome: nomeCliente,
    })
      .then((data) => {
        if (data.clientes.length > 0) {
          setClientes(data.clientes);
        }
      })
      .catch(() => {
        toast.error('Houve um erro ao tentar buscar os dados, tente novamente mais tarde');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    const clientesCompativeis = clientes.find((cliente) =>
      cliente?.pessoa?.nome?.toLowerCase().startsWith(inputValue.toLowerCase()),
    );

    if (clientesCompativeis) {
      return;
    }

    setNomeCliente(inputValue);
  }, [inputValue]);

  useEffect(() => {
    listarClientes();
  }, [nomeCliente]);

  useEffect(() => {
    if (isClearSelectedValue) {
      setValue(''), setInputValue('');
    }
  }, [isClearSelectedValue]);

  return {
    open,
    value,
    isFetching,
    clientes,
    inputValue,
    setOpen,
    setValue,
    setInputValue,
  };
};
