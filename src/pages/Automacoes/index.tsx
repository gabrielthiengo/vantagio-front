import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Boxes } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Automacoes() {
  const navigate = useNavigate();
  return (
    <div className="h-full">
      <PageHeader title="Automações" icon={<Boxes size={18} />}>
        <Button
          onClick={() => {
            navigate('/automacao/criar');
          }}
        >
          + Automação
        </Button>
      </PageHeader>
    </div>
  );
}
