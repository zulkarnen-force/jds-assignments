import STATUS_CODE from "../enums/StatusCode";

export default class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class BadRequest extends ApiError {
  constructor(message: string = "Bad Request") {
    super(STATUS_CODE.BAD_REQUEST, message);
  }
}

export class NotFound extends ApiError {
  constructor(message: string = "tidak ditemukan") {
    super(STATUS_CODE.NOT_FOUND, message);
  }
}

export class NotContent extends ApiError {
  constructor(message: string) {
    super(STATUS_CODE.NO_CONTENT, message);
  }
}
