export interface IWebhookEmpresa {
  id: number;
  name: string;
  status: string;
  topic: string;
  resource: string;
  event: string;
  delivery_url: string;
  date_created: Date;
}
