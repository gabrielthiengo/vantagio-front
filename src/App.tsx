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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/authenticate" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedLayout>
                <Inicio />
              </ProtectedLayout>
            }
          />

          <Route
            path="/pedidos"
            element={
              <ProtectedLayout>
                <Pedidos />
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
            path="/automacoes"
            element={
              <ProtectedLayout>
                <Automacoes />
              </ProtectedLayout>
            }
          />

          <Route
            path="/campanhas"
            element={
              <ProtectedLayout>
                <Campanhas />
              </ProtectedLayout>
            }
          />

          <Route
            path="/clientes"
            element={
              <ProtectedLayout>
                <Clientes />
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

export default App;
