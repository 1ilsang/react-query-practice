export interface ServerResponse {
  text: string;
}
export interface ServerListResponse extends ServerResponse {
  list: string[];
}

export interface CustomError {
  message: string;
}

export type InitResult = string;
export type ListResult = string[];
