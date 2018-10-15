export enum ResponseStatus {
  /**
   * Description:
   * All went well, and (usually) some data was returned.
   *
   * Required Keys:
   * status, data
   *
   * Optional Keys:
   */
  success = 'success',
  /**
   * Description:
   * There was a problem with the data submitted, or some pre-condition of
   * the API call wasn't satisfied
   *
   * Required Keys:
   * status, data
   *
   * Optional Keys:
   */
  fail = 'fail',
  /**
   * Description:
   * An error occurred in processing the request, i.e. an exception was thrown
   *
   * Required Keys:
   * status, message
   *
   * Optional Keys:
   * code, data
   */
  error = 'error',
}
/**
 * Based on the JSend format
 *
 * https://labs.omniti.com/labs/jsend
 */
export class Response {
  public status: ResponseStatus;
  public data?: any;
  public message?: string;
  public code?: any;

  constructor(object: {
    status?: ResponseStatus,
    data?: any,
    message?: string,
    code?: any,
    statusCode?: number;
  }) {
    Object.assign(this, object);
  }
}
