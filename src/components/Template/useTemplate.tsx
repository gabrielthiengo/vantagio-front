import { ITemplate } from '@/interfaces/ITemplate';
import { templateStringParaJSON } from '@/lib/template-string-json';
import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useTemplate = ({ canal }: { canal?: string }) => {
  const [template, setTemplate] = useState<ITemplate>({} as ITemplate);
  const [variaveis, setVariaveis] = useState([]);
  const [isSalvando, setIsSalvando] = useState(false);

  useEffect(() => {
    if (canal) {
      setTemplate({
        ...template,
        canal,
      });
    }
  }, []);

  const extrairVariaveisTexto = (texto: string) => {
    return templateStringParaJSON(texto);
  };

  const salvarTemplate = async (): Promise<ITemplate | null> => {
    let variaveisAssunto: any[] = [];
    let variaveisConteudo: any[] = [];
    let variaveis: any[] = [];

    if (template.assunto) {
      variaveisAssunto = extrairVariaveisTexto(template.assunto);
    }

    variaveisConteudo = extrairVariaveisTexto(template.conteudo);

    variaveis = [...new Set([...variaveisAssunto, ...variaveisConteudo])];

    const { sucesso, mensagem, data } = await apiRequest<ITemplate>('/template', 'POST', {
      nome: template.nome,
      canal: template.canal,
      assunto: template.assunto,
      conteudo: template.conteudo,
      variaveis,
    });

    if (!sucesso) {
      setIsSalvando(false);
      toast.error(mensagem);
      return null;
    }

    toast.success('Template salvo com sucesso');
    setIsSalvando(false);

    return data ?? ({} as ITemplate);
  };

  return {
    template,
    variaveis,
    isSalvando,
    setTemplate,
    setVariaveis,
    salvarTemplate,
  };
};
