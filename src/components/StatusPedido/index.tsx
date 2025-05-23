import React from 'react';

export type Status = 'PENDENTE' | 'EM PROCESSAMENTO' | 'CONCLUIDO' | 'REEMBOLSADO' | 'CANCELADO' | 'ENVIADO';

interface Props {
  status: Status;
}

const statusStyles: Record<Status, string> = {
  PENDENTE: 'text-yellow-600 border-yellow-600',
  'EM PROCESSAMENTO': 'text-blue-600 border-blue-600',
  CONCLUIDO: 'text-green-600 border-green-600',
  REEMBOLSADO: 'text-purple-600 border-purple-600',
  CANCELADO: 'text-red-600 border-red-600',
  ENVIADO: 'text-teal-600 border-teal-600',
};

export const StatusPedido: React.FC<Props> = ({ status }) => {
  return (
    <span
      className={`w-full flex items-center justify-center text-xs font-medium px-2 py-0.5 border rounded-md ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};
