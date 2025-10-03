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
import Clientes from './pages/Clientes';
import Pedidos from './pages/Pedidos';
import ClienteDetalhe from './pages/ClienteDetalhe';
import PrimeiroAcesso from './pages/PrimeiroAcesso';
import PedidoDetalhe from './pages/PedidoDetalhe';
import ReguaList from './pages/ReguaNotificacao/ReguaList';
import ReguaDetalhe from './pages/ReguaNotificacao/ReguaDetalhe';
import ReguaInsights from './pages/ReguaNotificacao/ReguaInsights';
import Timers from './pages/Timers';

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
            path="/regua"
            element={
              <ProtectedLayout>
                <ReguaList />
              </ProtectedLayout>
            }
          />

          <Route
            path="/regua/form/:id"
            element={
              <ProtectedLayout>
                <ReguaDetalhe />
              </ProtectedLayout>
            }
          />

          <Route
            path="/regua/form"
            element={
              <ProtectedLayout>
                <ReguaDetalhe />
              </ProtectedLayout>
            }
          />

          <Route
            path="/regua/insight/:id"
            element={
              <ProtectedLayout>
                <ReguaInsights />
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
            path="/timers"
            element={
              <ProtectedLayout>
                <Timers />
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
