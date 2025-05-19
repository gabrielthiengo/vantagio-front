import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Send } from 'lucide-react';
import { RecomendacoesData } from '../types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ClienteDetalheComunicacao from '@/components/Cliente/ClienteDetalheComunicacao';

type GerirAcoesRecProps = {
  isEnabled: boolean;
  clientes: RecomendacoesData[];
};

export function GerirAcoesRecomendacoes({ isEnabled, clientes }: GerirAcoesRecProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1" variant="default" disabled={!isEnabled}>
          Enviar mensagem <Send size={13} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70%]">
        <DialogHeader>
          <DialogTitle>Enviar mensagem</DialogTitle>
          <DialogDescription>
            Utilize este fluxo para se comunicar de forma personalizada com seus clientes.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Accordion type="single">
            {clientes.map((cliente) => {
              return (
                <AccordionItem key={cliente.id} value={cliente.nome}>
                  <AccordionTrigger style={{ textDecoration: 'none' }}>{cliente.nome}</AccordionTrigger>
                  <AccordionContent>
                    <ClienteDetalheComunicacao cliente={cliente} />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
