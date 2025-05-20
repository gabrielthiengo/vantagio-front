type StatusProps = {
  isActive: boolean;
};

export const Status = ({ isActive }: StatusProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
      <span className={`text-sm font-semibold ${isActive ? 'text-emerald-400' : 'text-red-400'}`}>
        {isActive ? 'Ativo' : 'Inativo'}
      </span>
    </div>
  );
};
