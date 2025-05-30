import { Navigate } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { getUserLocalStorage } from '@/context/AuthProvider/util';

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const user = getUserLocalStorage();

  if (!user || !user.token) {
    return <Navigate to={'/authenticate'} />;
  }

  if (user.validade && user.validade <= new Date()) {
    return <Navigate to={'/authenticate'} />;
  }

  return (
    <div className="w-full min-h-screen bg-defaultBackground">
      <Sidebar />
      <div className="ml-64 flex flex-col" style={{ position: 'relative', zIndex: '1' }}>
        <div
          className="w-full h-24 ml-64 right-0 bg-secondaryBackground opacity-85 absolute z-0 "
          style={{ zIndex: '-1', borderRadius: '0 0 24px 24px' }}
        />

        <div className="w-full p-6" style={{ height: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
