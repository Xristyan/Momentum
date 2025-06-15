export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export enum RequestMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type ActionResponse = {
  success: boolean;
  data?: unknown;
  message?: string;
};
