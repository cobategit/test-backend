import { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken'

export interface IJwtWrapper {
  sign(
    payload?: string | Buffer | object,
    secretOrPrivateKey?: Secret,
    options?: SignOptions
  ): string

  verify(
    token?: string,
    secretOrPublicKey?: Secret,
    options?: VerifyOptions
  ): any
}
