import { ICliente } from './ICliente';

export interface IClienteEngajamento {
  id?: number;
  tenantId?: number;
  notaEngajamento: number;
  valorGastoCompras?: string;
  ticketMedio?: string;
  dataUltimaCompra?: Date;
  dataUltimoProcessamento: Date;
  cliente: ICliente;
}
