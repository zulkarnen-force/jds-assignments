import { Response } from "express";

export interface ExtendedResponse extends Response {
  sendResponse?: (body?: any) => Response;
}
