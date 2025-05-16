import {
  BarChart3,
  Boxes,
  Cog,
  FolderCog,
  HomeIcon,
  PackageSearch,
  ShoppingBasket,
  Users,
  UserSearch,
  Building2,
  LineChart,
} from 'lucide-react';
import { SidebarItem } from '../SidebarItem';
import logo from '@/assets/logo-vantagio.jpeg';
import { UserInfo } from '../UserInfo';
import { useAuth } from '@/context/AuthProvider/useAuth';

export const Sidebar = () => {
  const { usuario } = useAuth();

  return (
    <div className="shadow-none border-r border-gray-300 h-full fixed w-64 p-3 pt-6 bg-white">
      <div className="w-full flex flex-col mb-8 mt-2 gap-2">
        <div className="w-full flex justify-center">
          <img src={logo} alt="logo" style={{ width: '170px' }} />
        </div>

        <UserInfo />
      </div>

      <div className="text-xs text-gray-400 font-semibold tracking-wider mb-2">GERAL</div>

      <SidebarItem title="Início" page="/">
        <HomeIcon size={18} />
      </SidebarItem>

      <SidebarItem title="Indicadores" page="/indicadores">
        <BarChart3 size={18} />
      </SidebarItem>

      <SidebarItem title="Pedidos" page="/pedidos">
        <ShoppingBasket size={18} />
      </SidebarItem>

      <div className="text-xs text-gray-400 font-semibold tracking-wider mb-2">CADASTROS</div>

      <SidebarItem title="Clientes" page="/clientes">
        <Users size={18} />
      </SidebarItem>

      <SidebarItem title="Campanhas" page="/campanhas">
        <LineChart size={18} />
      </SidebarItem>

      <SidebarItem title="Automações" page="/automacoes">
        <Boxes size={18} />
      </SidebarItem>

      <div className="text-xs text-gray-400 font-semibold tracking-wider mb-2">EMPRESA</div>

      <SidebarItem title="Configurações" page="/configurações">
        <Cog size={18} />
      </SidebarItem>

      {usuario?.isMaster && (
        <SidebarItem title="Empresas" page="/empresa">
          <Building2 size={18} />
        </SidebarItem>
      )}
    </div>
  );
};
