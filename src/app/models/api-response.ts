export class ApiResponse<T> {
  public status: ApiResponseStatus;
  public result: T;

  constructor(status: ApiResponseStatus, result: T) {
    this.status = status;
    this.result = result;
  }
}

export class ApiResponseStatus {
  public msg: string;
  public type: RequestResultStatus;

  constructor(msg: string, type: RequestResultStatus) {
    this.msg = msg;
    this.type = type;
  }
}

export enum RequestResultStatus {
  Success = 0,
  Warning = 1,
  Error = 2,
  InvalidToken = 3
}
