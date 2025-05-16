import { useAuth } from '@/context/AuthProvider/useAuth';
import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function doLogout() {
    logout();
    navigate('/authenticate');
  }

  return (
    <div className="flex items-center justify-between text-white py-4 px-6">
      <div className="w-full flex items-center justify-end gap-4">
        <span>{usuario?.email}</span>

        <button className="hover:text-slate-300" onClick={doLogout}>
          <LogOutIcon size={22} />
        </button>
      </div>
    </div>
  );
};
