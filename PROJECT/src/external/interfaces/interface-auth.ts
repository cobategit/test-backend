export interface IAuth {
  checkTokenJwt(req: any, res: any, done: any): Promise<any>
  checkIsAdmin(roles: string, req: any, res: any, done: any): Promise<any>
}
