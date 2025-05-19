import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatarCurrency(valor: number) {
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);

  return valorFormatado;
}

export function removerMascaraTelefone(telefone: string) {
  return telefone.replace('/[^d]/g', '');
}

type EnderecoParams = {
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
};

export function formatarEndereco(endereco: EnderecoParams): string {
  const partes: string[] = [];

  if (endereco.logradouro) {
    const logradouroFormatado = endereco.numero ? `${endereco.logradouro}, ${endereco.numero}` : endereco.logradouro;

    partes.push(logradouroFormatado);
  }

  if (endereco.complemento) partes.push(endereco.complemento);
  if (endereco.bairro) partes.push(endereco.bairro);
  if (endereco.cidade || endereco.uf) {
    const cidadeUf = [endereco.cidade, endereco.uf].filter(Boolean).join(' - ');
    partes.push(cidadeUf);
  }
  if (endereco.cep) partes.push(`CEP: ${endereco.cep}`);

  return partes.join(', ');
}

export function formatarData(dataIso: string): string {
  const data = new Date(dataIso);

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}
