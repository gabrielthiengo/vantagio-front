import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { ProtectedLayout } from './components/ProtectedLayout';

import { ToastContainer } from 'react-toastify';
import { Inicio } from './pages/Inicio';

import 'react-toastify/dist/ReactToastify.css';
import { Indicadores } from './pages/Indicadores';
import { Empresas } from './pages/Empresas';
import { ConfigurarEmpresa } from './pages/Empresas/ConfigurarEmpresa';
import { Automacoes } from './pages/Automacoes';
import { Campanhas } from './pages/Campanhas';
import Clientes from './pages/Clientes';
import Pedidos from './pages/Pedidos';
import ClienteDetalhe from './pages/ClienteDetalhe';
import { AutomacaoCriar } from './pages/AutomcacaoCriar';
import PrimeiroAcesso from './pages/PrimeiroAcesso';
import { CampanhaDetalhe } from './pages/CampanhaDetalhe';
import PedidoDetalhe from './pages/PedidoDetalhe';
import AutomacaoInsigt from './pages/AutomacaoInsigt';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/authenticate" element={<Login />} />

          <Route path="/acesso" element={<PrimeiroAcesso />} />

          <Route
            path="/"
            element={
              <ProtectedLayout>
                <Inicio />
              </ProtectedLayout>
            }
          />

          <Route
            path="/pedido"
            element={
              <ProtectedLayout>
                <Pedidos />
              </ProtectedLayout>
            }
          />

          <Route
            path="/pedido/detalhe/:id"
            element={
              <ProtectedLayout>
                <PedidoDetalhe />
              </ProtectedLayout>
            }
          />

          <Route
            path="/indicadores"
            element={
              <ProtectedLayout>
                <Indicadores />
              </ProtectedLayout>
            }
          />

          <Route
            path="/automacao"
            element={
              <ProtectedLayout>
                <Automacoes />
              </ProtectedLayout>
            }
          />

          <Route
            path="/automacao/insigt/:id"
            element={
              <ProtectedLayout>
                <AutomacaoInsigt />
              </ProtectedLayout>
            }
          />

          <Route
            path="/automacao/criar"
            element={
              <ProtectedLayout>
                <AutomacaoCriar />
              </ProtectedLayout>
            }
          />

          <Route
            path="/campanha"
            element={
              <ProtectedLayout>
                <Campanhas />
              </ProtectedLayout>
            }
          />

          <Route
            path="/campanha/detalhe"
            element={
              <ProtectedLayout>
                <CampanhaDetalhe />
              </ProtectedLayout>
            }
          />

          <Route
            path="/cliente"
            element={
              <ProtectedLayout>
                <Clientes />
              </ProtectedLayout>
            }
          />

          <Route
            path="/cliente/detalhe/:id"
            element={
              <ProtectedLayout>
                <ClienteDetalhe />
              </ProtectedLayout>
            }
          />

          <Route
            path="/empresa"
            element={
              <ProtectedLayout>
                <Empresas />
              </ProtectedLayout>
            }
          />

          <Route
            path="/empresa/configurar/:cnpj"
            element={
              <ProtectedLayout>
                <ConfigurarEmpresa />
              </ProtectedLayout>
            }
          />
        </Routes>
        <ToastContainer theme="colored" autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
}
