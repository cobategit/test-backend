import { IEmployeeRepo, EmployeeE } from '../../domain'
import { IAuth } from '../interfaces'
import { AppErrorV1, TokenJwtUtil } from '../utils'
import dotenv from 'dotenv'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
dotenv.config()
export class AuthMiddleware implements IAuth {
  private tokenJwt: TokenJwtUtil
  private iuserrepo: IEmployeeRepo

  constructor(tokenJwt: TokenJwtUtil, iuserrepo: IEmployeeRepo) {
    this.tokenJwt = tokenJwt
    this.iuserrepo = iuserrepo
  }

  async checkTokenJwt(request: any, reply: any, done: any) {
    const token = request.headers['x-access-token']
    const mapWhere: Map<string, Pick<EmployeeE, 'id'>> = new Map<string, Pick<EmployeeE, 'id'>>()

    if (!token) {
      done(new AppErrorV1(`400`, false, `auth token not found`, '001'))
    }

    try {
      const resToken = await this.tokenJwt.verifyToken(token)
      let rows = await this.iuserrepo.findOne(mapWhere.set('data', { id: resToken.id! }))

      if (!rows) {
        done(new AppErrorV1(`400`, false, `user not found`, '001'))
      }
      
      request.headers.user = resToken
      
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        done(new AppErrorV1(`400`, false, `jwt token expired`, '001'))
      }

      if (error instanceof JsonWebTokenError) {
        done(new AppErrorV1(`400`, false, `invalid token jwt`, '001'))
      }

      done(new AppErrorV1(`400`, false, `${error}`, '001'))
    }
  }

  async checkIsAdmin(roles: string, request: any, reply: any, done: any) {
    if (request.headers.user.role != roles) {
      done(
        new AppErrorV1(
          `400`,
          false,
          `Authorization was just given to admin`,
          '001'
        )
      )
    }
  }
}
