export class AppErrorV1 extends Error {
  statusCode: string | number
  code: string
  status: boolean

  constructor(
    statusCode: string | number,
    status: boolean,
    message: string,
    code: string
  ) {
    super(message)

    this.statusCode = statusCode
    this.message = message
    this.code = code
    this.status = status

    Object.setPrototypeOf(this, AppErrorV1.prototype)
  }

  serializeErrors() {
    return {
      statusCode: this.statusCode,
      status: this.status,
      message: this.message,
      response_code: this.code,
    }
  }
}