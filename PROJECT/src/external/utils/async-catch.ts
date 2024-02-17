import { AppErrorV1 } from './app-error'

export const asyncCatch = (fn: any) => {
  return (req: any, reply: any) => {
    Promise.resolve(fn(req, reply)).catch((error) => {
      throw new AppErrorV1(`400`, false, `Error asyncCatch - ${error}`, '001')
    })
  }
}
