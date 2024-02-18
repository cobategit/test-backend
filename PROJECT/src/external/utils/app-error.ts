export class AppErrorV1 extends Error {
  statusCode: string | number
  code: string
  status: boolean
  data?: any

  constructor(
    statusCode: string | number,
    status: boolean,
    message: string,
    code: string,
    data?: any
  ) {
    super(message)

    this.statusCode = statusCode
    this.message = message
    this.code = code
    this.status = status
    this.data = data

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