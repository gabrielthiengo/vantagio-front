export interface IResponse<T = unknown> {
  type: string;
  message: string;
  response?: T | null;
}
