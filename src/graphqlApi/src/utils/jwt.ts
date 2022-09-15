import config from 'config';
import jwt from 'jsonwebtoken';

const publicKey = Buffer.from(config.get<string>('publicKey'), 'base64').toString('ascii');
const privateKey = Buffer.from(config.get<string>('privateKey'), 'base64').toString('ascii');

console.log('publicKey', publicKey);
console.log('privateKey', privateKey);

export function signJwt(object: Record<string, unknown>, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    return jwt.verify(token, publicKey) as T;
  } catch (e) {
    return null;
  }
}
