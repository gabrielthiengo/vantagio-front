import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F', '#FF8042'];

export const Indicadores = () => {
  const vendasPorMes = [
    { mes: 'Jan', total: 5000 },
    { mes: 'Fev', total: 7200 },
    { mes: 'Mar', total: 6100 },
    { mes: 'Abr', total: 8400 },
  ];

  const clientesPorStatus = [
    { status: 'Novos', value: 150 },
    { status: 'Ativos', value: 300 },
    { status: 'Inativos', value: 100 },
    { status: 'Perdidos', value: 50 },
  ];

  const pedidosPorStatus = [
    { status: 'PENDENTE', total: 25 },
    { status: 'EM PROCESSAMENTO', total: 12 },
    { status: 'CONCLUIDO', total: 80 },
    { status: 'REEMBOLSADO', total: 4 },
    { status: 'CANCELADO', total: 10 },
    { status: 'ENVIADO', total: 40 },
  ];

  // Exemplo de dados simulados para novos clientes por semana
  const dadosNovosClientes = [
    { semana: '01/04', total: 5 },
    { semana: '08/04', total: 12 },
    { semana: '15/04', total: 8 },
    { semana: '22/04', total: 15 },
    { semana: '29/04', total: 10 },
  ];

  // Exemplo de dados simulados para últimos contatos
  const dadosContatosRecentes = [
    { cliente: 'Maria Souza', mensagem: 'Quero saber mais sobre o produto X', data: '2025-05-16 10:42' },
    { cliente: 'João Silva', mensagem: 'Pedido não chegou ainda', data: '2025-05-16 09:31' },
    { cliente: 'Ana Paula', mensagem: 'Amei o atendimento 😍', data: '2025-05-15 17:05' },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="p-4 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Vendas por Mês</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vendasPorMes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Clientes por Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={clientesPorStatus} dataKey="value" nameKey="status" cx="50%" cy="50%" outerRadius={100} label>
              {clientesPorStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white rounded-2xl shadow col-span-2">
        <h2 className="text-xl font-semibold mb-4">Pedidos por Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pedidosPorStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#00C49F" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de evolução de novos clientes */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Evolução de Novos Clientes</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dadosNovosClientes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Lista de últimos contatos */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Últimos Contatos</h2>
          <div className="space-y-3">
            {dadosContatosRecentes.map((contato, index) => (
              <div key={index} className="p-3 rounded-xl bg-gray-100">
                <p className="font-medium">{contato.cliente}</p>
                <p className="text-sm text-gray-600">{contato.mensagem}</p>
                <p className="text-xs text-gray-500">{contato.data}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
