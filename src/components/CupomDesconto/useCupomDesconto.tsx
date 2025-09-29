import { ICupomDesconto } from '@/interfaces/ICupomDesconto';
import { apiRequest } from '@/services/apiRequest';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useCupomDesconto = () => {
  const [loading, setLoading] = useState('');
  const [codigoCupom, setCodigoCupom] = useState('');
  const [valorPedido, setValorPedido] = useState(0);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [cupom, setCupom] = useState<ICupomDesconto | null>(null);

  async function validarCupomCliente() {
    setLoading('validando');

    const { sucesso, mensagem, data } = await apiRequest<ICupomDesconto>('/cupom/validar', 'GET', null, {
      codigo: codigoCupom,
      clienteId,
    });

    if (!sucesso) {
      toast.error(mensagem);
      setLoading('');
      return;
    }

    if (data) {
      setCupom(data);
    }

    setLoading('');
  }

  async function aplicarCupomCliente() {
    setLoading('aplicando');

    const { sucesso, mensagem } = await apiRequest<ICupomDesconto>('/cupom/aplicar', 'POST', null, {
      cupomId: cupom?.id,
      clienteId,
      valorPedido,
    });

    if (!sucesso) {
      toast.error(mensagem);
      setLoading('');
      return;
    }

    toast.success(mensagem);

    setCodigoCupom(''), setClienteId(null);
    setValorPedido(0);
    setCupom(null);
    setLoading('');
  }

  return {
    loading,
    codigoCupom,
    clienteId,
    cupom,
    valorPedido,
    setValorPedido,
    setClienteId,
    setCodigoCupom,
    aplicarCupomCliente,
    validarCupomCliente,
  };
};
