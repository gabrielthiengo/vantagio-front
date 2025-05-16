import { IUsuario } from '@/interfaces/IUsuario';
import ListarUsuario from '@/services/usuario/ListarUsuario';
import { useEffect, useState } from 'react';

export const useDadosUsuario = (empresaId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);

  async function listarUsuariosEmpresa() {
    try {
      setIsLoading(true);

      const listaUsuarios = await ListarUsuario.listarUsuariosPorEmpresaId(empresaId);

      if (listaUsuarios) {
        setUsuarios(listaUsuarios);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listarUsuariosEmpresa();
  }, []);

  return {
    isLoading,
    usuarios,
  };
};
