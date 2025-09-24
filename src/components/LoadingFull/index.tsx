import { LoaderCircle } from 'lucide-react';

const LoadingFull = () => {
  return (
    <div className="bg-gray-500/60 z-10 fixed top-0 left-0 h-[100vh] w-[100vw] flex flex-col items-center justify-center">
      <div className="bg-white opacity-90 p-4 rounded">
        <img src="" alt="" />
        <div className="flex items-center gap-2">
          <LoaderCircle className="animate-spin" size={20} />

          <span className="font-bold">Carregando...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingFull;
