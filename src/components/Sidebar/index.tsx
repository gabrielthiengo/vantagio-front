import { Boxes, HomeIcon, Users, Building2, LogOut, Timer } from 'lucide-react';
import { SidebarItem } from '../SidebarItem';
import logo from '@/assets/logo-vantagio.jpeg';
import logo2 from '@/assets/VLogo.png';
import { UserInfo } from '../UserInfo';
import { useAuth } from '@/context/AuthProvider/useAuth';

export const Sidebar = () => {
  const { usuario } = useAuth();

  return (
    <div className="shadow-none border-r border-gray-300 fixed bg-white menu-vantagio">
      <div className="w-full flex flex-col mb-8 min-h-32 mt-2 gap-2">
        <div className="w-full flex justify-center">
          <img src={logo} alt="logo" style={{ width: '170px' }} />
          <img className="v-logo" src={logo2} alt="logo2" style={{ height: '30px' }} />
        </div>

        <UserInfo />
      </div>

      <div className="text-xs text-gray-400 font-semibold tracking-wider mb-2">GERAL</div>

      <SidebarItem title="Início" page="/">
        <HomeIcon size={18} />
      </SidebarItem>

      {/* <SidebarItem title="Pedidos" page="/pedido">
        <ShoppingBasket size={18} />
      </SidebarItem> */}

      <div className="text-xs text-gray-400 font-semibold tracking-wider mb-2">CADASTROS</div>

      <SidebarItem title="Clientes" page="/cliente">
        <Users size={18} />
      </SidebarItem>

      {/* <SidebarItem title="Campanhas" page="/campanha">
        <LineChart size={18} />
      </SidebarItem> */}

      <SidebarItem title="Automações" page="/regua">
        <Boxes size={18} />
      </SidebarItem>

      <div className="text-xs text-gray-400 font-semibold tracking-wider mb-2">EMPRESA</div>

      {/* {<SidebarItem title="Configurações" page="/configuraçao">
        <Cog size={18} />
      </SidebarItem>} */}

      {usuario?.isMaster && (
        <SidebarItem title="Empresas" page="/empresa">
          <Building2 size={18} />
        </SidebarItem>
      )}

      {usuario?.isMaster && (
        <SidebarItem title="Timers" page="/timers">
          <Timer size={18} />
        </SidebarItem>
      )}

      <SidebarItem title="Sair" page="/sair">
        <LogOut size={18} />
      </SidebarItem>
    </div>
  );
};
