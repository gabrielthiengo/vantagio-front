import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { DadosEmpresa } from './DadosEmpresa';
import { DadosIntegracao } from './DadosIntegracao';
import { DadosUsuario } from './DadosUsuario';
import { useConfigurarEmpresa } from './useConfigurarEmpresa';

export const ConfigurarEmpresa = () => {
  const { cnpj } = useParams();
  const { isLoading, empresa } = useConfigurarEmpresa(cnpj || '');

  return (
    <div className="h-full">
      <PageHeader title={`Configurar empresa - ${empresa?.nomeFantasia}`} icon={<Building2 size={18} />} />

      <Card className="rounded p-2">
        <Tabs defaultValue="empresa">
          <TabsList className="grid w-full grid-cols-3 gap-2">
            <TabsTrigger className="bg-gray-200" value="empresa">
              Empresa
            </TabsTrigger>
            <TabsTrigger className="bg-gray-200" value="integracao">
              Integrações
            </TabsTrigger>
            <TabsTrigger className="bg-gray-200" value="usuario">
              Usuários
            </TabsTrigger>
          </TabsList>
          <TabsContent value="empresa">{empresa && <DadosEmpresa empresa={empresa} />}</TabsContent>
          <TabsContent value="integracao">{empresa?.id && <DadosIntegracao empresaId={empresa.id} />}</TabsContent>
          <TabsContent value="usuario">{empresa && <DadosUsuario empresaId={empresa.id} />}</TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
