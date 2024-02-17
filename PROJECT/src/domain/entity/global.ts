import { EmployeeE } from "./employee"

export interface ResponseDataE<T> {
  response_code?: number
  status?: boolean
  message?: string
  data?: T | null
  rows?: T
  count?: number
}

export interface ErrorE {
  error?: string
  code?: string
  message?: string
  statusCode?: number
  data?: any;
  stack?: any
}
export interface HeadersE {
  'x-access-token'?: string
  user?: EmployeeE
}

export type PaginationE = {
  page?: number
  per_page?: number
  link?: string
}