interface LambdaResponse {
  headers: {};
  body: {};
  statusCode: ResponseStatusCode;
}

export enum ResponseStatus {
  ok = 'ok',
  error = 'error',
}

export enum ResponseStatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
}

export class Response {
  public status: ResponseStatus;
  public statusCode?: ResponseStatusCode;
  public responseTime: string;
  public message?: string;
  public data?: {};

  constructor(object: {
    status: ResponseStatus,
    statusCode?: ResponseStatusCode,
    message?: string,
    data?: {},
    // The response time in MS
    responseTime: number,
  }) {
    this.status = object.status;
    if (object.statusCode) { this.statusCode = object.statusCode; }
    if (object.message) { this.message = object.message; }
    if (object.data) { this.data = object.data; }
    // Convert response time to Seconds
    this.responseTime = `${object.responseTime / 1000}s`;
  }
  /**
   * Prepares the response to be properly sent through an api call by formatting it
   * and adding the proper headers
   *
   * @author jordanskomer
   */
  public send(): LambdaResponse {
    return {
      body: JSON.stringify(this),
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: this.statusCode ? this.statusCode : 200,
    };
  }
}
