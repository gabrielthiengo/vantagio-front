import InputBlock from '../InputBlock';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTemplate } from './useTemplate';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import ListaVariaveis from '../ListaVariaveis';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ITemplate } from '@/interfaces/ITemplate';

type TemplateProps = {
  canal?: string;
  onCreate: (template: ITemplate) => void;
};

const Template = ({ canal, onCreate }: TemplateProps) => {
  const { template, isSalvando, setTemplate, salvarTemplate } = useTemplate({ canal });

  const createTemplate = () => {
    salvarTemplate().then((template) => {
      if (template) {
        onCreate(template);
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <InputBlock label="Canal de envio">
        <Select
          disabled={isSalvando}
          onValueChange={(v) => setTemplate({ ...template, canal: v })}
          value={template.canal}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="whatsapp">Whatsapp</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
      </InputBlock>

      <InputBlock label="Nome do template">
        <Input
          disabled={isSalvando}
          placeholder="Ex: Template xpto"
          value={template.nome}
          onChange={(e) =>
            setTemplate({
              ...template,
              nome: e.target.value,
            })
          }
        />
      </InputBlock>

      {template.canal === 'email' && (
        <div className="flex flex-col gap-1">
          <InputBlock label="Assunto">
            <Input
              disabled={isSalvando}
              placeholder="Ex: Olá cliente..."
              value={template.assunto}
              onChange={(e) =>
                setTemplate({
                  ...template,
                  assunto: e.target.value,
                })
              }
            />
          </InputBlock>

          <ListaVariaveis
            onSelect={(variavel) => {
              setTemplate({
                ...template,
                assunto: `${template.assunto}${variavel}`,
              });
            }}
          />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <InputBlock label="Mensagem">
          <Textarea
            disabled={isSalvando}
            value={template.conteudo}
            onChange={(e) =>
              setTemplate({
                ...template,
                conteudo: e.target.value,
              })
            }
          />
        </InputBlock>
        <ListaVariaveis
          onSelect={(variavel) => {
            setTemplate({
              ...template,
              conteudo: `${template.conteudo}${variavel}`,
            });
          }}
        />
      </div>

      <div className="mt-5 flex justify-end">
        {!isSalvando ? (
          <Button
            className="flex items-center gap-1"
            disabled={
              !template.canal ||
              !template.nome ||
              !template.conteudo ||
              template.canal === '' ||
              template.nome === '' ||
              template.conteudo === ''
            }
            onClick={createTemplate}
          >
            Salvar template
          </Button>
        ) : (
          <Button disabled className=" bg-secondaryBackground">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Salvando...
          </Button>
        )}
      </div>
    </div>
  );
};

export default Template;
