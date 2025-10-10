import { useMemo, useState } from 'react';
import { BarChart, Bar, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer, LabelList, CartesianGrid } from 'recharts';
import EngajamentoDetalhe from '../EngajamentoDetalhe';

type AnyRow = { status: string; total: number };

const STATUS_ORDER = ['Resgate', 'Frio', 'Morno', 'Quente', 'Elite'] as const;
type Status = (typeof STATUS_ORDER)[number];

type Row = { status: Status; total: number };

// Cores (Tailwind-like)
const STATUS_COLOR: Record<Status, string> = {
  Resgate: '#ef4444', // red-500
  Frio: '#9ca3af', // gray-400
  Morno: '#f59e0b', // amber-500
  Quente: '#22c55e', // green-500
  Elite: '#a855f7', // violet-500
};

// Normalização case-insensitive
const NORMALIZE: Record<string, Status> = {
  resgate: 'Resgate',
  frio: 'Frio',
  morno: 'Morno',
  quente: 'Quente',
  elite: 'Elite',
};

function toStatus(s: string | null | undefined): Status | null {
  const key = (s ?? '').trim().toLowerCase();
  return NORMALIZE[key] ?? null;
}

function toPercentData(rows: Row[]) {
  const totalAll = rows.reduce((acc, r) => acc + (r.total || 0), 0);

  // Garante a presença de todas as chaves na ordem
  const raw: Record<Status, number> = {
    Resgate: 0,
    Frio: 0,
    Morno: 0,
    Quente: 0,
    Elite: 0,
  };

  for (const r of rows) raw[r.status] += r.total || 0;

  const chartRow = {
    name: 'Distribuição',
    ...Object.fromEntries(
      STATUS_ORDER.map((s) => [s, totalAll > 0 ? Number(((raw[s] / totalAll) * 100).toFixed(2)) : 0]),
    ),
  } as Record<string, number | string>;

  return { chartRow, totalAll, raw };
}

const CustomTooltip = ({ active, payload, label, rawCounts }: any & { rawCounts: Record<Status, number> }) => {
  if (!active || !payload?.length) return null;
  const list = [...payload].sort(
    (a, b) => STATUS_ORDER.indexOf(a.name as Status) - STATUS_ORDER.indexOf(b.name as Status),
  );
  return (
    <div className="rounded-xl border bg-white p-3 shadow-md">
      <div className="mb-1 text-sm font-medium">{label}</div>
      {list.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span className="inline-block h-2 w-2 rounded" style={{ background: p.color }} />
          <span className="w-20">{p.name}:</span>
          <span className="tabular-nums">
            {p.value}% ({rawCounts[p.name as Status] ?? 0})
          </span>
        </div>
      ))}
    </div>
  );
};

export function EngajamentoBar100({ rows }: { rows: AnyRow[] }) {
  const [status, setStatus] = useState('');

  const rowsTyped: Row[] = useMemo(() => {
    const arr = rows
      .map((r) => {
        const s = toStatus(r.status);
        if (!s) return null; // ignora status desconhecido
        return { status: s, total: Number(r.total) || 0 } as Row;
      })
      .filter((r): r is Row => r !== null);

    return arr;
  }, [rows]);

  const { chartRow, raw } = useMemo(() => toPercentData(rowsTyped), [rowsTyped]);

  const data = useMemo(() => [chartRow], [chartRow]);

  const handleClickBar = (status: string) => {
    setStatus(status);
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide />
          <YAxis type="number" domain={[0, 100]} hide />
          <Tooltip content={<CustomTooltip rawCounts={raw} />} />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: 8 }}
            formatter={(value: string) => <span className="text-sm">{value}</span>}
          />

          {STATUS_ORDER.map((s) => (
            <Bar
              key={s}
              dataKey={s}
              fill={STATUS_COLOR[s]}
              stackId="1"
              cursor="pointer"
              onClick={(_, __) => {
                handleClickBar(s);
              }}
            >
              <LabelList
                dataKey={s}
                position="center"
                formatter={(v: number) => (v >= 10 ? `${v}%` : '')}
                className="text-[10px] fill-white"
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>

      {status !== '' && <EngajamentoDetalhe status={status} onToggleChange={() => handleClickBar('')} />}
    </div>
  );
}
