import { LoaderCircle } from 'lucide-react';

export default function LoadingComponent() {
  return (
    <div className="w-full flex flex-col items-center gap-2 border border-gray-300 rounded-md py-5 shadow text-primary">
      <LoaderCircle className="animate-spin" size={28} />

      <span className="text-sm">Carregando...</span>
    </div>
  );
}
