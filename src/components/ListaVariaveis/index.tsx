import { variaveisMensagem } from '@/lib/variaveis';
import { useEffect, useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type ListaVariaveisProps = {
  onSelect: (variavel: string) => void;
};

export default function ListaVariaveis({ onSelect }: ListaVariaveisProps) {
  const [variaveisList, setVariaveisList] = useState([{ chave: '', descricao: '' }]);

  useEffect(() => {
    setVariaveisList(variaveisMensagem);
  }, []);

  return (
    <div className="flex gap-1 flex-wrap mt-2">
      {variaveisList.map((variavel) => {
        return (
          <TooltipProvider key={variavel.chave}>
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <span
                  className="text-xs text-gray-500"
                  onClick={() => {
                    onSelect(variavel.chave);
                  }}
                >
                  {variavel.chave}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{variavel.descricao}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
