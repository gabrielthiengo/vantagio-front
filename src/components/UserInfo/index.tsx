import { useAuth } from '@/context/AuthProvider/useAuth';

export const UserInfo = () => {
  const { usuario, empresa } = useAuth();

  return (
    <div className="w-full flex flex-col justify-center items-center mt-2">
      <div className="p-3 bg-gray-100 text-primary rounded-full w-12 text-center font-semibold border border-gray-300">
        {(usuario?.nome ?? '').substring(0, 2).toUpperCase()}
      </div>
      <span className="font-semibold text-primary text-sm">{usuario?.nome}</span>
      <span className="text-xs text-slate-400 text-center">{empresa?.nome}</span>
    </div>
  );
};
