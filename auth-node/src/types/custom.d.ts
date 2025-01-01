declare namespace Express {
  export interface Request {
    user?: any;
  }
}

declare interface Error {
  name: string;
  message: string;
  stack?: string;
  code?: number | string;
}
